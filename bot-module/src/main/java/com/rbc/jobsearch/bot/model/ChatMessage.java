package com.rbc.jobsearch.bot.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    private String id;
    private String userId;
    private String message;
    private MessageType type;
    private LocalDateTime timestamp;
    private String sessionId;

    public enum MessageType {
        USER, BOT, SYSTEM
    }
} 