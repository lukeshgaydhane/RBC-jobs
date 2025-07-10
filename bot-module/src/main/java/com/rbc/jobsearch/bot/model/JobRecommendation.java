package com.rbc.jobsearch.bot.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobRecommendation {

    private Long jobId;
    private String title;
    private String company;
    private String location;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private Double matchScore;
    private List<String> matchedSkills;
    private String recommendationReason;
    private String jobType;
    private String experienceLevel;
} 