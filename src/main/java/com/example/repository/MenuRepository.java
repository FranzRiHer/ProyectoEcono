package com.example.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.entities.Menu;

@Repository
public class MenuRepository{
    @Autowired
    private MenuCRUDRepository MenuCRUDRepository;

    public Menu getView(String v){
        return MenuCRUDRepository.findById(v).orElse(null);
    }

}