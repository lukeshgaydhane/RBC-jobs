package com.rbc.jobsearch.controller;

import com.rbc.jobsearch.model.Job;
import com.rbc.jobsearch.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        log.info("GET /jobs - Fetching all jobs");
        List<Job> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        log.info("GET /jobs/{} - Fetching job by id", id);
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        log.info("POST /jobs - Creating new job: {}", job.getTitle());
        Job createdJob = jobService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody Job job) {
        log.info("PUT /jobs/{} - Updating job", id);
        try {
            Job updatedJob = jobService.updateJob(id, job);
            return ResponseEntity.ok(updatedJob);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        log.info("DELETE /jobs/{} - Deleting job", id);
        try {
            jobService.deleteJob(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobs(@RequestParam String keyword) {
        log.info("GET /jobs/search?keyword={} - Searching jobs", keyword);
        List<Job> jobs = jobService.searchJobs(keyword);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/company/{company}")
    public ResponseEntity<List<Job>> getJobsByCompany(@PathVariable String company) {
        log.info("GET /jobs/company/{} - Fetching jobs by company", company);
        List<Job> jobs = jobService.getJobsByCompany(company);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Job>> getJobsByLocation(@PathVariable String location) {
        log.info("GET /jobs/location/{} - Fetching jobs by location", location);
        List<Job> jobs = jobService.getJobsByLocation(location);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/type/{jobType}")
    public ResponseEntity<List<Job>> getJobsByType(@PathVariable Job.JobType jobType) {
        log.info("GET /jobs/type/{} - Fetching jobs by type", jobType);
        List<Job> jobs = jobService.getJobsByType(jobType);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/experience/{experienceLevel}")
    public ResponseEntity<List<Job>> getJobsByExperienceLevel(@PathVariable Job.ExperienceLevel experienceLevel) {
        log.info("GET /jobs/experience/{} - Fetching jobs by experience level", experienceLevel);
        List<Job> jobs = jobService.getJobsByExperienceLevel(experienceLevel);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/salary")
    public ResponseEntity<List<Job>> getJobsBySalaryRange(
            @RequestParam Double minSalary,
            @RequestParam Double maxSalary) {
        log.info("GET /jobs/salary?minSalary={}&maxSalary={} - Fetching jobs by salary range", minSalary, maxSalary);
        List<Job> jobs = jobService.getJobsBySalaryRange(minSalary, maxSalary);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/companies")
    public ResponseEntity<List<String>> getAllCompanies() {
        log.info("GET /jobs/companies - Fetching all companies");
        List<String> companies = jobService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        log.info("GET /jobs/locations - Fetching all locations");
        List<String> locations = jobService.getAllLocations();
        return ResponseEntity.ok(locations);
    }
} 