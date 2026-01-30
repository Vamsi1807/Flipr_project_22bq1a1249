package com.project.demo_real_estate.controller;

import java.util.List;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.project.demo_real_estate.model.Subscription;
import com.project.demo_real_estate.service.SubscriptionService;

@RestController
@RequestMapping("/api/subscribe")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // Subscribe (public)
    @PostMapping
    public Subscription subscribe(@RequestBody Subscription subscription) {
        return subscriptionService.saveSubscription(subscription);
    }

    // View all subscriptions (admin)
    @GetMapping
    public List<Subscription> getAllSubscriptions(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        requireAdmin(authHeader);
        return subscriptionService.getAllSubscriptions();
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
