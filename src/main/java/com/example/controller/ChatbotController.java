package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.ChatbotService;


@CrossOrigin
@RestController
@RequestMapping("/chatbot")
public class ChatbotController {    
    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/query")
    public ResponseEntity<String> sendQueryToChatbot(@RequestBody String userMessage) {
        // Aquí es donde reenviarías el mensaje al chatbot y devolvería la respuesta
        String chatbotResponse = chatbotService.sendQueryToChatbot(userMessage);
        return ResponseEntity.ok(chatbotResponse);
}
}
