package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.controller.EgresosController;
import com.example.controller.IngresoController;
import com.example.controller.MetasController;

@Service
public class ChatbotService {

    @Autowired
    private EgresosController egresosController;

    @Autowired 
    private IngresoController ingresoController;

    @Autowired
    private MetasController metasController;


    @Value("${chatbot.token}")
    private String chatbotToken;


    private RestTemplate restTemplate = new RestTemplate();

    public String sendQueryToChatbot(String userMessage, Long id) {
        HttpHeaders headers = new HttpHeaders();
        String egresos_csv = egresosController.getBackCsv(id);
        String ingresos_csv = ingresoController.getBackCsv(id);
        String metas_csv = metasController.getBackCsv(id);

        String jsonString = userMessage;
        String textoNuevo = "Contexto_csv: Egresos -> "+egresos_csv+". Ingresos -> "+ingresos_csv+". Metas -> "+metas_csv+".Prompt de usuario: ";

        int indiceIn0 = jsonString.indexOf("\"in-0\":\"") + "\"in-0\":\"".length();

        String jsonStringModificado = jsonString.substring(0, indiceIn0) + textoNuevo  + jsonString.substring(indiceIn0);

        System.out.println("\n\n\n\n"+jsonStringModificado);
        headers.setBearerAuth("0712a71f-72fd-4cbe-8548-806d9aa5ac91"); // Pon tu token aquí
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Construye el cuerpo de la solicitud
        String requestBody = jsonStringModificado; // Formato según la API de chatbot

        // Crea la entidad que incluirá tus headers y body
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Envía la solicitud POST
        ResponseEntity<String> response = restTemplate.exchange(
            "https://api.stack-ai.com/inference/v0/run/77dd424a-e336-45b8-82df-52b31dffb113/6629ddfa1cb3433070a6b41d", // URL de la API del chatbot
            HttpMethod.POST,
            entity,
            String.class
        );

        // Devuelve la respuesta del chatbot
        return response.getBody();
    }
}

