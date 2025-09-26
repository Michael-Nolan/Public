package com.languagelatte.priorityqueue.controller;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.languagelatte.priorityqueue.model.Card;
import com.languagelatte.priorityqueue.model.FutureReview;

@SpringBootTest
@AutoConfigureMockMvc
class NodeControllerIntegrationTest {

    private final List<Card> usCapitals = List.of(new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Alabama", "Montgomery"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Alaska", "Juneau"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Arizona", "Phoenix"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Arkansas", "Little Rock"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of California", "Sacramento"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Colorado", "Denver"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Connecticut", "Hartford"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Delaware", "Dover"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Florida", "Tallahassee"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Georgia", "Atlanta"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Hawaii", "Honolulu"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Idaho", "Boise"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Illinois", "Springfield"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Indiana", "Indianapolis"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Iowa", "Des Moines"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Kansas", "Topeka"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Kentucky", "Frankfort"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Louisiana", "Baton Rouge"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Maine", "Augusta"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Maryland", "Annapolis"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Massachusetts", "Boston"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Michigan", "Lansing"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Minnesota", "Saint Paul"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Mississippi", "Jackson"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Missouri", "Jefferson City"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Montana", "Helena"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Nebraska", "Lincoln"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Nevada", "Carson City"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of New Hampshire", "Concord"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of New Jersey", "Trenton"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of New Mexico", "Santa Fe"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of New York", "Albany"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of North Carolina", "Raleigh"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of North Dakota", "Bismarck"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Ohio", "Columbus"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Oklahoma", "Oklahoma City"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Oregon", "Salem"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Pennsylvania", "Harrisburg"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Rhode Island", "Providence"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of South Carolina", "Columbia"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of South Dakota", "Pierre"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Tennessee", "Nashville"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Texas", "Austin"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Utah", "Salt Lake City"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Vermont", "Montpelier"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Virginia", "Richmond"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Washington", "Olympia"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of West Virginia", "Charleston"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Wisconsin", "Madison"),
            new Card(UUID.randomUUID(), "US Capitals", "What is the capital of Wyoming", "Cheyenne")
    );

    @Autowired
    MockMvc mockMvc;

    @Test
    void testStart() throws Exception {

                    this.mockMvc.perform(post("/start")
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding("utf-8"))
                    .andExpect(status().isOk());

    }

    //@Test
    void testCreateNode() throws Exception {

        ObjectMapper om = new ObjectMapper();
        for (Card card : usCapitals) {
            this.mockMvc.perform(get("/card?id=" + card.id.toString()))
                    //.andDo(print())
                    .andExpect(status().isNotFound());

            this.mockMvc.perform(post("/card")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsString(card))
                    .characterEncoding("utf-8"))
                    .andExpect(status().isOk());

            this.mockMvc.perform(get("/card?id=" + card.id.toString()))
                    //.andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString(card.id.toString())));

        }

        var result = this.mockMvc.perform(get("/get_future_reviews"))
                .andExpect(status().is2xxSuccessful()).andReturn();

        result.getResponse().getContentAsString();
        List<FutureReview> li = Arrays.asList(om.readValue(result.getResponse().getContentAsString(), FutureReview[].class));
        Assertions.assertEquals(50, li.size());

        this.mockMvc.perform(get("/get_next_review"))
                .andExpect(status().is2xxSuccessful()).andReturn();

        for (Card card : usCapitals) {
            this.mockMvc.perform(delete("/card")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsString(card))
                    .characterEncoding("utf-8"))
                    .andExpect(status().isOk());

            this.mockMvc.perform(get("/card?id=" + card.id.toString()))
                    //.andDo(print())
                    .andExpect(status().isNotFound());

        }
    }
}
