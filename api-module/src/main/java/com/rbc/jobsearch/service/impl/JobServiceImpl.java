package com.rbc.jobsearch.service.impl;

import com.rbc.jobsearch.model.Job;
import com.rbc.jobsearch.repository.JobRepository;
import com.rbc.jobsearch.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    @Override
    public List<Job> getAllJobs() {
        log.info("Fetching all active jobs");
        return jobRepository.findByIsActiveTrue();
    }

    @Override
    public Optional<Job> getJobById(Long id) {
        log.info("Fetching job with id: {}", id);
        return jobRepository.findById(id);
    }

    @Override
    public Job createJob(Job job) {
        log.info("Creating new job: {}", job.getTitle());
        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Long id, Job job) {
        log.info("Updating job with id: {}", id);
        Optional<Job> existingJob = jobRepository.findById(id);
        if (existingJob.isPresent()) {
            Job updatedJob = existingJob.get();
            updatedJob.setTitle(job.getTitle());
            updatedJob.setCompany(job.getCompany());
            updatedJob.setDescription(job.getDescription());
            updatedJob.setLocation(job.getLocation());
            updatedJob.setJobType(job.getJobType());
            updatedJob.setExperienceLevel(job.getExperienceLevel());
            updatedJob.setMinSalary(job.getMinSalary());
            updatedJob.setMaxSalary(job.getMaxSalary());
            updatedJob.setSkills(job.getSkills());
            updatedJob.setApplicationDeadline(job.getApplicationDeadline());
            updatedJob.setActive(job.isActive());
            return jobRepository.save(updatedJob);
        }
        throw new RuntimeException("Job not found with id: " + id);
    }

    @Override
    public void deleteJob(Long id) {
        log.info("Deleting job with id: {}", id);
        Optional<Job> job = jobRepository.findById(id);
        if (job.isPresent()) {
            Job deletedJob = job.get();
            deletedJob.setActive(false);
            jobRepository.save(deletedJob);
        } else {
            throw new RuntimeException("Job not found with id: " + id);
        }
    }

    @Override
    public List<Job> searchJobs(String keyword) {
        log.info("Searching jobs with keyword: {}", keyword);
        return jobRepository.searchJobsByKeyword(keyword);
    }

    @Override
    public List<Job> getJobsByCompany(String company) {
        log.info("Fetching jobs for company: {}", company);
        return jobRepository.findByCompanyContainingIgnoreCase(company);
    }

    @Override
    public List<Job> getJobsByLocation(String location) {
        log.info("Fetching jobs in location: {}", location);
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Job> getJobsByType(Job.JobType jobType) {
        log.info("Fetching jobs of type: {}", jobType);
        return jobRepository.findByJobType(jobType);
    }

    @Override
    public List<Job> getJobsByExperienceLevel(Job.ExperienceLevel experienceLevel) {
        log.info("Fetching jobs for experience level: {}", experienceLevel);
        return jobRepository.findByExperienceLevel(experienceLevel);
    }

    @Override
    public List<Job> getJobsBySalaryRange(Double minSalary, Double maxSalary) {
        log.info("Fetching jobs with salary range: {} - {}", minSalary, maxSalary);
        return jobRepository.findBySalaryRange(minSalary, maxSalary);
    }

    @Override
    public List<String> getAllCompanies() {
        log.info("Fetching all companies");
        return jobRepository.findAllActiveCompanies();
    }

    @Override
    public List<String> getAllLocations() {
        log.info("Fetching all locations");
        return jobRepository.findAllActiveLocations();
    }
} 