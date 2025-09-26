package com.languagelatte.priorityqueue.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.UUID;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.languagelatte.priorityqueue.model.Card;

@RestController
public class CardController {

    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final ObjectMapper objectMapper;

    public CardController(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate namedParameterJdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Transactional
    @PostMapping("/card")
    public ResponseEntity<Integer> createCard(@RequestBody Card card) throws JsonProcessingException {

        int resp = jdbcTemplate.update("INSERT INTO card VALUES (?, ?::json)", card.id, objectMapper.writeValueAsString(card));
        jdbcTemplate.update("INSERT INTO FUTURE_DUE VALUES (?, ?, ?, ?)", UUID.randomUUID(), null, true, card.id);

        return ResponseEntity.ok().body(resp);
    }

    @GetMapping("/card")
    public ResponseEntity<Card> getCard(@RequestParam UUID id) throws JsonProcessingException {
        SqlParameterSource namedParameters = new MapSqlParameterSource().addValue("id", id);

        try {
            String result = namedParameterJdbcTemplate.queryForObject("SELECT Value FROM card where id = :id", namedParameters, String.class);
            Card card = objectMapper.readValue(result, Card.class);
            return ResponseEntity.ok(card);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/card")
    public ResponseEntity<Integer> deleteCard(@RequestBody Card card) {
        int resp = jdbcTemplate.update("DELETE FROM card where id = ?", card.id);
        return ResponseEntity.ok().body(resp);
    }

    @PostMapping("/start")
    public ResponseEntity<String> start() throws Exception {

        String containerName = "java-c-builder-" + System.currentTimeMillis();

        // String[] command = {
        //     "docker", "run", "--rm", 
        //     "alpine:latest", 
        //     "sh", "-c", "echo 'yellow world'"
        // };
        // String[] command = {
        //     "docker", "run", "--rm", "--name", containerName,
        //     "alpine:latest", 
        //     "sh", "-c", "while true; do echo 'yellow world'; sleep 0.5; done"
        // };
        String cCode = """
                       /* Hello world program */
                       
                       #include <stdio.h>
                       
                       int main(void)
                       {
                           printf("Hello, World!");  // Actually do the work here
                       }""";

        // Docker command to build and run the C program
        String[] command = {
            "docker", "run", "--rm", "--name", containerName,
            "gcc:latest", // Use GCC image which has C compiler
            "sh", "-c",
            // Create the C file, compile it, and run it
            "echo '" + cCode + "' > hello.c && "
            + "echo 'Created C source file:' && "
            + "cat hello.c && "
            + "echo '' && "
            + "echo 'Compiling C program...' && "
            + "gcc -o hello hello.c && "
            + "echo 'Compilation successful!' && "
            + "echo '' && "
            + "echo 'Running the compiled program:' && "
            + "./hello && "
            + "echo '' && "
            + "echo 'Program execution completed!' && "
            + "echo 'Starting infinite loop to keep container running...' && "
            + "while true; do echo 'Container still running...'; sleep 1; done"
        };

// Create and start the process
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true); // Merge error stream with output

        Process process = processBuilder.start();

        // Start a thread to read output from the container
        Thread outputThread = new Thread(() -> {
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {

                String line;
                System.out.println("Container output:");
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            } catch (IOException e) {
                System.err.println("Error reading container output: " + e.getMessage());
            }
        });
        outputThread.start();

        // Wait for 2 seconds
        System.out.println("Waiting 2 seconds before killing container...");
        Thread.sleep(50000);

        // Kill the Docker container explicitly
        System.out.println("Killing Docker container...");
        killDockerContainer(containerName);

        // Also destroy the process
        process.destroyForcibly();

        // Wait for the process to complete
        int exitCode = process.waitFor();

        System.out.println("Container was terminated with exit code: " + exitCode);

        return ResponseEntity.ok("card");
    }

    private void killDockerContainer(String containerName) {
        try {
            // Execute docker kill command
            String[] killCommand = {"docker", "kill", containerName};
            ProcessBuilder killProcessBuilder = new ProcessBuilder(killCommand);
            Process killProcess = killProcessBuilder.start();

            int killExitCode = killProcess.waitFor();
            if (killExitCode == 0) {
                System.out.println("Successfully killed container: " + containerName);
            } else {
                System.err.println("Failed to kill container, exit code: " + killExitCode);
            }

        } catch (IOException | InterruptedException e) {
            System.err.println("Error killing Docker container: " + e.getMessage());
        }
    }

}
