package com.example.entities;

import java.time.YearMonth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class InformeMeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private YearMonth fecha;

    @ManyToOne
    @JoinColumn(name = "id_meta")
    @JsonIgnoreProperties("InformesMetas")
    private Meta meta;

    private double total_mes;

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public YearMonth getFecha() {
        return fecha;
    }

    public void setFecha(YearMonth fecha) {
        this.fecha = fecha;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta id_meta) {
        this.meta = id_meta;
    }

    public double getTotal_mes() {
        return total_mes;
    }

    public void setTotal_mes(double total_mes) {
        this.total_mes = total_mes;
    }

}
