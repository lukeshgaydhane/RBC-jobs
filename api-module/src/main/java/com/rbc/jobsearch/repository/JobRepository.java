package com.rbc.jobsearch.repository;

import com.rbc.jobsearch.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByIsActiveTrue();

    List<Job> findByCompanyContainingIgnoreCase(String company);

    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findByJobType(Job.JobType jobType);

    List<Job> findByExperienceLevel(Job.ExperienceLevel experienceLevel);

    @Query("SELECT j FROM Job j WHERE j.isActive = true AND " +
           "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.skills) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Job> searchJobsByKeyword(@Param("keyword") String keyword);

    @Query("SELECT j FROM Job j WHERE j.isActive = true AND " +
           "j.minSalary >= :minSalary AND j.maxSalary <= :maxSalary")
    List<Job> findBySalaryRange(@Param("minSalary") Double minSalary, 
                                @Param("maxSalary") Double maxSalary);

    @Query("SELECT DISTINCT j.company FROM Job j WHERE j.isActive = true")
    List<String> findAllActiveCompanies();

    @Query("SELECT DISTINCT j.location FROM Job j WHERE j.isActive = true")
    List<String> findAllActiveLocations();
} 