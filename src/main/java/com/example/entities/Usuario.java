package com.example.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;


@Entity
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String nombre; 
    private String email;
    private int saldo;
    private Long egresoTotal;
    private Long ingresoTotal;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario" , cascade = CascadeType.ALL)
    List<Egreso> Egresos;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario", cascade = CascadeType.ALL)
    List<Ingreso> Ingresos;
    
    public Long getId() {
        return id;
    }
    public String getNombre() {
        return nombre;
    }
    public String getEmail() {
        return email;
    }
    public int getSaldo() {
        return saldo;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setSaldo(int saldo) {
        this.saldo = saldo;
    }

    public Long getEgresoTotal() {
        return egresoTotal;
    }

    public void setEgresoTotal(Long egresoTotal) {
        this.egresoTotal = egresoTotal;
    }

    public Long getIngresoTotal() {
        return ingresoTotal;
    }

    public void setIngresoTotal(Long ingresoTotal) {
        this.ingresoTotal = ingresoTotal;
    }

}