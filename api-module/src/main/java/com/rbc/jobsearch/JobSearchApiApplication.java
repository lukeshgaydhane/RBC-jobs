package com.rbc.jobsearch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class JobSearchApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobSearchApiApplication.class, args);
    }
} 