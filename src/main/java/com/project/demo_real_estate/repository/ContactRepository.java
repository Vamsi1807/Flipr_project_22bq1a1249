package com.project.demo_real_estate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.project.demo_real_estate.model.Contact;

public interface ContactRepository extends MongoRepository<Contact, String> {
}
