package com.project.demo_real_estate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.project.demo_real_estate.model.Client;

public interface ClientRepository extends MongoRepository<Client, String> {
}
