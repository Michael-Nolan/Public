package com.languagelatte.priorityqueue.controller;

import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.languagelatte.priorityqueue.model.Node;

@SpringBootTest
@AutoConfigureMockMvc
class NodeControllerIntegrationTest {

    private final List<Node> usCapitals = List.of(
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Alabama", "Montgomery"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Alaska", "Juneau"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Arizona", "Phoenix"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Arkansas", "Little Rock"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of California", "Sacramento"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Colorado", "Denver"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Connecticut", "Hartford"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Delaware", "Dover"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Florida", "Tallahassee"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Georgia", "Atlanta"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Hawaii", "Honolulu"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Idaho", "Boise"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Illinois", "Springfield"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Indiana", "Indianapolis"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Iowa", "Des Moines"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Kansas", "Topeka"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Kentucky", "Frankfort"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Louisiana", "Baton Rouge"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Maine", "Augusta"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Maryland", "Annapolis"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Massachusetts", "Boston"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Michigan", "Lansing"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Minnesota", "Saint Paul"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Mississippi", "Jackson"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Missouri", "Jefferson City"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Montana", "Helena"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Nebraska", "Lincoln"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Nevada", "Carson City"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of New Hampshire", "Concord"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of New Jersey", "Trenton"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of New Mexico", "Santa Fe"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of New York", "Albany"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of North Carolina", "Raleigh"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of North Dakota", "Bismarck"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Ohio", "Columbus"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Oklahoma", "Oklahoma City"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Oregon", "Salem"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Pennsylvania", "Harrisburg"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Rhode Island", "Providence"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of South Carolina", "Columbia"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of South Dakota", "Pierre"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Tennessee", "Nashville"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Texas", "Austin"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Utah", "Salt Lake City"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Vermont", "Montpelier"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Virginia", "Richmond"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Washington", "Olympia"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of West Virginia", "Charleston"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Wisconsin", "Madison"),
            new Node(UUID.randomUUID(), "US Capitals", "What is the capital of Wyoming", "Cheyenne")
    );

    @Autowired
    MockMvc mockMvc;

    @Test
    void getNodeSuccess() throws Exception {
        this.mockMvc.perform(get("/get_node?id=86f01ef8-7f0e-46d1-94c0-3bd145b14100"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("86f01ef8-7f0e-46d1-94c0-3bd145b14100")));
    }

    @Test
    void getNodeNotFound() throws Exception {
        this.mockMvc.perform(get("/get_node?id=86f01ef8-7f0e-46d1-94c0-3bd145b19999"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateNode() throws Exception {

        ObjectMapper om = new ObjectMapper();
        for (Node node : usCapitals) {
            this.mockMvc.perform(get("/get_node?id=" + node.id.toString()))
                    .andDo(print())
                    .andExpect(status().isNotFound());

            this.mockMvc.perform(post("/create_node")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsString(node))
                    .characterEncoding("utf-8"))
                    .andExpect(status().isOk());

            this.mockMvc.perform(get("/get_node?id=" + node.id.toString()))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString(node.id.toString())));
        }

    }
}
