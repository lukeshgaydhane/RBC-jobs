package com.rbc.jobsearch.bot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class JobSearchBotApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobSearchBotApplication.class, args);
    }
} 