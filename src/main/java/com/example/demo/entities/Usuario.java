package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//import jakarta.persistence.OneToMany;
//import java.util.List;


@Entity
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    private String nombre; 
    private String email;
    private int ingresoTotal;
    private int egresoTotal; 
    //@OneToMany

    public int getId() {
        return id;
    }
    public String getNombre() {
        return nombre;
    }
    public String getEmail() {
        return email;
    }

    public int getIngresoTotal() {
        return ingresoTotal;
    }
    public void setIngresoTotal(int ingresoTotal) {
        this.ingresoTotal = ingresoTotal;
    }
    public int getEgresoTotal() {
        return egresoTotal;
    }
    public void setEgresoTotal(int egresoTotal) {
        this.egresoTotal = egresoTotal;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
