package com.project.demo_real_estate.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.demo_real_estate.model.Client;
import com.project.demo_real_estate.repository.ClientRepository;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public void deleteClient(String id) {
        clientRepository.deleteById(id);
    }
}
