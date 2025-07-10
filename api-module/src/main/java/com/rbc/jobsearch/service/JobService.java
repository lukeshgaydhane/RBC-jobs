package com.rbc.jobsearch.service;

import com.rbc.jobsearch.model.Job;
import java.util.List;
import java.util.Optional;

public interface JobService {
    
    List<Job> getAllJobs();
    
    Optional<Job> getJobById(Long id);
    
    Job createJob(Job job);
    
    Job updateJob(Long id, Job job);
    
    void deleteJob(Long id);
    
    List<Job> searchJobs(String keyword);
    
    List<Job> getJobsByCompany(String company);
    
    List<Job> getJobsByLocation(String location);
    
    List<Job> getJobsByType(Job.JobType jobType);
    
    List<Job> getJobsByExperienceLevel(Job.ExperienceLevel experienceLevel);
    
    List<Job> getJobsBySalaryRange(Double minSalary, Double maxSalary);
    
    List<String> getAllCompanies();
    
    List<String> getAllLocations();
} 