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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.languagelatte.priorityqueue.model.FutureReview;

@RestController
public class ReviewController {

    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final ObjectMapper objectMapper;

    public ReviewController(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate namedParameterJdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }


    @GetMapping("/get_future_reviews")
    public ResponseEntity<List<FutureReview>> getFutureReviews() throws JsonProcessingException {
        SqlParameterSource namedParameters = new MapSqlParameterSource();

        List<FutureReview> resp = new ArrayList<>();
        try {
            jdbcTemplate.query("SELECT * FROM future_due", (ResultSet rs) -> {

                while (rs.next()) {

                    resp.add(new FutureReview(rs.getObject("due_date",
                            LocalDateTime.class),
                            rs.getBoolean("is_new"),
                            rs.getObject("card_id", UUID.class),
                            rs.getObject("id", UUID.class)));

                }
            });

            return ResponseEntity.ok(resp);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get_next_review")
    public ResponseEntity<FutureReview> getNextReview() throws JsonProcessingException {
        try {
            FutureReview resp = jdbcTemplate.queryForObject("SELECT * FROM future_due order by due_date asc limit 1", (rs,rowNum) -> {
                return new FutureReview(rs.getObject("due_date",
                            LocalDateTime.class),
                            rs.getBoolean("is_new"),
                            rs.getObject("card_id", UUID.class),
                            rs.getObject("id", UUID.class));
                });
            return ResponseEntity.ok(resp);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }


}
