package com.rbc.jobsearch.bot.controller;

import com.rbc.jobsearch.bot.model.JobRecommendation;
import com.rbc.jobsearch.bot.model.ChatMessage;
import com.rbc.jobsearch.bot.service.AIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bot")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class BotController {

    private final AIService aiService;

    @PostMapping("/recommendations")
    public ResponseEntity<List<JobRecommendation>> getJobRecommendations(
            @RequestParam String userId,
            @RequestParam List<String> skills,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double expectedSalary) {
        
        log.info("GET /bot/recommendations - Getting recommendations for user: {}", userId);
        List<JobRecommendation> recommendations = aiService.getJobRecommendations(userId, skills, location, expectedSalary);
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatMessage> processChatMessage(@RequestBody ChatMessage message) {
        log.info("POST /bot/chat - Processing chat message from user: {}", message.getUserId());
        ChatMessage response = aiService.processChatMessage(message);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/skill-match")
    public ResponseEntity<Double> calculateSkillMatch(
            @RequestParam List<String> jobSkills,
            @RequestParam List<String> userSkills) {
        
        log.info("POST /bot/skill-match - Calculating skill match");
        Double matchScore = aiService.calculateSkillMatchScore(jobSkills, userSkills);
        return ResponseEntity.ok(matchScore);
    }

    @PostMapping("/generate-description")
    public ResponseEntity<String> generateJobDescription(
            @RequestParam String title,
            @RequestParam String company,
            @RequestParam(required = false) List<String> requirements) {
        
        log.info("POST /bot/generate-description - Generating job description for: {}", title);
        String description = aiService.generateJobDescription(title, company, requirements);
        return ResponseEntity.ok(description);
    }

    @PostMapping("/extract-skills")
    public ResponseEntity<List<String>> extractSkills(@RequestParam String text) {
        log.info("POST /bot/extract-skills - Extracting skills from text");
        List<String> skills = aiService.extractSkillsFromText(text);
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        log.info("GET /bot/health - Health check");
        return ResponseEntity.ok("BOT service is running");
    }
} 