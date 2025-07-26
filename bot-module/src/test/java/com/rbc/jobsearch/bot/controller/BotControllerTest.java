package com.rbc.jobsearch.bot.controller;

import com.rbc.jobsearch.bot.model.ChatMessage;
import com.rbc.jobsearch.bot.service.AIService;
import com.rbc.jobsearch.bot.service.GeminiQnaService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(BotController.class)
class BotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AIService aiService;

    @MockBean
    private GeminiQnaService geminiQnaService;

    @Test
    void testProcessChatMessage() throws Exception {
        ChatMessage userMessage = ChatMessage.builder()
                .userId("test-user")
                .message("Hello, what can you do?")
                .type(ChatMessage.MessageType.USER)
                .sessionId("session-1")
                .build();

        ChatMessage botResponse = ChatMessage.builder()
                .id("bot-123")
                .userId("test-user")
                .message("I am your job search assistant. How can I help?")
                .type(ChatMessage.MessageType.BOT)
                .sessionId("session-1")
                .build();

        Mockito.when(aiService.processChatMessage(Mockito.any(ChatMessage.class))).thenReturn(botResponse);

        ObjectMapper objectMapper = new ObjectMapper();
        String requestJson = objectMapper.writeValueAsString(userMessage);

        mockMvc.perform(MockMvcRequestBuilders.post("/bot/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("I am your job search assistant. How can I help?"));
    }
} 