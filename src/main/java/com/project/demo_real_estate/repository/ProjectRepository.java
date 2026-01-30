package com.project.demo_real_estate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.project.demo_real_estate.model.Project;

public interface ProjectRepository extends MongoRepository<Project, String> {
}
