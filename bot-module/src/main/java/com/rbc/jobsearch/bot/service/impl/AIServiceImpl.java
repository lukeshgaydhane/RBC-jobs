package com.rbc.jobsearch.bot.service.impl;

import com.rbc.jobsearch.bot.model.JobRecommendation;
import com.rbc.jobsearch.bot.model.ChatMessage;
import com.rbc.jobsearch.bot.service.AIService;
import com.rbc.jobsearch.bot.service.GeminiQnaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
public class AIServiceImpl implements AIService {

    private final Random random = new Random();
    private final GeminiQnaService geminiQnaService;

    public AIServiceImpl(GeminiQnaService geminiQnaService) {
        this.geminiQnaService = geminiQnaService;
    }

    @Override
    public List<JobRecommendation> getJobRecommendations(String userId, List<String> skills, String location, Double expectedSalary) {
        log.info("Getting job recommendations for user: {} with skills: {}", userId, skills);
        
        // Placeholder implementation - will be replaced with actual AI model
        List<JobRecommendation> recommendations = new ArrayList<>();
        
        // Simulate AI recommendations
        for (int i = 0; i < 5; i++) {
            JobRecommendation recommendation = JobRecommendation.builder()
                    .jobId((long) (i + 1))
                    .title("Software Engineer " + (i + 1))
                    .company("Tech Company " + (i + 1))
                    .location(location != null ? location : "Remote")
                    .minSalary(java.math.BigDecimal.valueOf(50000 + i * 10000))
                    .maxSalary(java.math.BigDecimal.valueOf(70000 + i * 10000))
                    .matchScore(0.7 + random.nextDouble() * 0.3)
                    .matchedSkills(skills.subList(0, Math.min(skills.size(), 3)))
                    .recommendationReason("Based on your skills and experience")
                    .jobType("FULL_TIME")
                    .experienceLevel("MID")
                    .build();
            
            recommendations.add(recommendation);
        }
        
        return recommendations;
    }

    @Override
    public ChatMessage processChatMessage(ChatMessage message) {
        log.info("Processing chat message: {}", message.getMessage());

        // Use GeminiQnaService for actual chatbot response
        String geminiResponse = geminiQnaService.getAnswer(message.getMessage());
        String botResponse = extractGeminiText(geminiResponse);

        return ChatMessage.builder()
                .id("bot-" + System.currentTimeMillis())
                .userId(message.getUserId())
                .message(botResponse)
                .type(ChatMessage.MessageType.BOT)
                .timestamp(java.time.LocalDateTime.now())
                .sessionId(message.getSessionId())
                .build();
    }

    @Override
    public Double calculateSkillMatchScore(List<String> jobSkills, List<String> userSkills) {
        log.info("Calculating skill match score between job skills: {} and user skills: {}", jobSkills, userSkills);
        
        if (jobSkills == null || userSkills == null || jobSkills.isEmpty() || userSkills.isEmpty()) {
            return 0.0;
        }
        
        // Simple matching algorithm - will be replaced with ML model
        long matches = jobSkills.stream()
                .filter(skill -> userSkills.stream()
                        .anyMatch(userSkill -> userSkill.toLowerCase().contains(skill.toLowerCase()) ||
                                skill.toLowerCase().contains(userSkill.toLowerCase())))
                .count();
        
        return (double) matches / jobSkills.size();
    }

    @Override
    public String generateJobDescription(String title, String company, List<String> requirements) {
        log.info("Generating job description for: {} at {}", title, company);
        
        // Placeholder implementation - will be replaced with AI text generation
        StringBuilder description = new StringBuilder();
        description.append("We are looking for a talented ").append(title).append(" to join our team at ").append(company).append(".\n\n");
        description.append("Key Responsibilities:\n");
        description.append("- Develop and maintain high-quality software solutions\n");
        description.append("- Collaborate with cross-functional teams\n");
        description.append("- Participate in code reviews and technical discussions\n\n");
        
        if (requirements != null && !requirements.isEmpty()) {
            description.append("Requirements:\n");
            for (String requirement : requirements) {
                description.append("- ").append(requirement).append("\n");
            }
        }
        
        return description.toString();
    }

    @Override
    public List<String> extractSkillsFromText(String text) {
        log.info("Extracting skills from text: {}", text);
        
        // Placeholder implementation - will be replaced with NLP model
        List<String> commonSkills = List.of(
                "Java", "Python", "JavaScript", "React", "Angular", "Spring Boot",
                "Docker", "Kubernetes", "AWS", "Azure", "SQL", "MongoDB",
                "Git", "Jenkins", "Agile", "Scrum", "Machine Learning", "AI"
        );
        
        List<String> extractedSkills = new ArrayList<>();
        for (String skill : commonSkills) {
            if (text.toLowerCase().contains(skill.toLowerCase())) {
                extractedSkills.add(skill);
            }
        }
        
        return extractedSkills;
    }

    // Helper method to extract the text from Gemini's JSON response
    private String extractGeminiText(String geminiResponse) {
        // Simple extraction: look for "text":"..." in the response
        if (geminiResponse == null) return "Sorry, I couldn't get a response from Gemini.";
        int idx = geminiResponse.indexOf("\"text\":");
        if (idx == -1) return geminiResponse;
        int start = geminiResponse.indexOf('"', idx + 7) + 1;
        int end = geminiResponse.indexOf('"', start);
        if (start > 0 && end > start) {
            return geminiResponse.substring(start, end);
        }
        return geminiResponse;
    }
} 