package com.languagelatte.priorityqueue.controller;

import java.sql.ResultSet;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.languagelatte.priorityqueue.model.FutureDue;
import com.languagelatte.priorityqueue.model.Node;

@RestController
public class NodeController {

    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final ObjectMapper objectMapper;

    public NodeController(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate namedParameterJdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Transactional
    @PostMapping("/create_node")
    public ResponseEntity<Integer> createNode(@RequestBody Node node) throws JsonProcessingException {

        int resp = jdbcTemplate.update("INSERT INTO card VALUES (?, ?::json)", node.id, objectMapper.writeValueAsString(node));
        jdbcTemplate.update("INSERT INTO FUTURE_DUE VALUES (?, ?, ?)", LocalDateTime.now(), true, node.id);

        return ResponseEntity.ok().body(resp);
    }

    @GetMapping("/get_node")
    public ResponseEntity<Node> getNode(@RequestParam UUID id) throws JsonProcessingException {
        SqlParameterSource namedParameters = new MapSqlParameterSource().addValue("id", id);

        try {
            String result = namedParameterJdbcTemplate.queryForObject("SELECT Value FROM card where id = :id", namedParameters, String.class);
            Node node = objectMapper.readValue(result, Node.class);
            return ResponseEntity.ok(node);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get_reviews")
    public ResponseEntity<List<FutureDue>> getFutureReviews() throws JsonProcessingException {
        SqlParameterSource namedParameters = new MapSqlParameterSource();

        List<FutureDue> resp = new ArrayList<>();
        try {
            jdbcTemplate.query("SELECT * FROM future_due", (ResultSet rs) -> {

                while (rs.next()) {

                    resp.add(new FutureDue(rs.getObject("due_date",
                            LocalDateTime.class),
                            rs.getBoolean("is_new"),
                            rs.getObject("card_id", UUID.class)));

                }
            });

            return ResponseEntity.ok(resp);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get_next_review")
    public ResponseEntity<FutureDue> getNextReview() throws JsonProcessingException {
        try {
            FutureDue resp = jdbcTemplate.queryForObject("SELECT * FROM future_due order by due_date asc limit 1", (rs,rowNum) -> {
                return new FutureDue(rs.getObject("due_date",
                            LocalDateTime.class),
                            rs.getBoolean("is_new"),
                            rs.getObject("card_id", UUID.class));
                });
            return ResponseEntity.ok(resp);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
