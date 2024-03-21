package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Menu;
import com.example.service.MenuService;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping("/vista/{id}")
    @ResponseBody // Esto hace que Spring MVC trate la respuesta como cuerpo de la respuesta
    public String getView(@PathVariable String id) {
        Menu menu = menuService.getView(id);
        if (menu != null) {
            return menu.getUrl();
        }
        return "Error: recurso no encontrado"; // O podrías lanzar una excepción personalizada aquí.
    }
}