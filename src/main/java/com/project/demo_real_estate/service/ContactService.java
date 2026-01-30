package com.project.demo_real_estate.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.demo_real_estate.model.Contact;
import com.project.demo_real_estate.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }
}
