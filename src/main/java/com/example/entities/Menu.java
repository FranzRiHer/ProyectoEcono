package com.example.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Menu {

    @Id
    private String id;
    private String url;
    
    public String getId() {
        return id;
    }
    public String getUrl() {
        return url;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    
}