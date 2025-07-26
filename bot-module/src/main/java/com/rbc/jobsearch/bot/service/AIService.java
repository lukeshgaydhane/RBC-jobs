package com.rbc.jobsearch.bot.service;

import com.rbc.jobsearch.bot.model.ChatMessage;
import com.rbc.jobsearch.bot.model.JobRecommendation;
import java.util.List;

public interface AIService {
    List<JobRecommendation> getJobRecommendations(String userId, List<String> skills, String location, Double expectedSalary);
    ChatMessage processChatMessage(ChatMessage message);
    Double calculateSkillMatchScore(List<String> jobSkills, List<String> userSkills);
    String generateJobDescription(String title, String company, java.util.List<String> requirements);
    java.util.List<String> extractSkillsFromText(String text);
} 