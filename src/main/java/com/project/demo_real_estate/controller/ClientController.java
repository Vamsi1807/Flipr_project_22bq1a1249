package com.project.demo_real_estate.controller;

import java.util.List;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.project.demo_real_estate.model.Client;
import com.project.demo_real_estate.service.ClientService;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @PostMapping
    public Client addClient(@RequestHeader(value = "Authorization", required = false) String authHeader,
                            @RequestBody Client client) {
        requireAdmin(authHeader);
        return clientService.saveClient(client);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@RequestHeader(value = "Authorization", required = false) String authHeader,
                             @PathVariable String id) {
        requireAdmin(authHeader);
        clientService.deleteClient(id);
    }

    private void requireAdmin(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        String base64Credentials = authHeader.substring("Basic ".length()).trim();
        String decoded = new String(Base64.getDecoder().decode(base64Credentials), StandardCharsets.UTF_8);
        String[] parts = decoded.split(":", 2);

        if (parts.length != 2 || !parts[0].equals(adminUsername) || !parts[1].equals(adminPassword)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
    }

}
