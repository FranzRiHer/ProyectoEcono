package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Menu;

import service.MenuService;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping("/menu/{id}")
    public Menu getView(@PathVariable String id) {
        Menu menu = menuService.getView(id);
        if (menu != null) {
            return menu;
        }
        return null;
    }

}
