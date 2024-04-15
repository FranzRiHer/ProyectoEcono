package com.example.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatbotService {

    private RestTemplate restTemplate = new RestTemplate();

    public String sendQueryToChatbot(String userMessage) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth("68ace983-7f02-4dac-aeae-11c568d0f9e2"); // Pon tu token aquí
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Construye el cuerpo de la solicitud
        String requestBody = userMessage; // Formato según la API de chatbot

        // Crea la entidad que incluirá tus headers y body
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Envía la solicitud POST
        ResponseEntity<String> response = restTemplate.exchange(
            "https://www.stack-inference.com/inference/v0/run/5f88e2a7-998b-4cca-a223-efff3e8e325a/661c4068895f652a7f53219f", // URL de la API del chatbot
            HttpMethod.POST,
            entity,
            String.class
        );

        // Devuelve la respuesta del chatbot
        return response.getBody();
    }
}

