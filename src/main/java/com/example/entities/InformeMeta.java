package com.example.entities;

import java.time.YearMonth;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_meta")
    private Meta id_meta;

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

    public Meta getId_meta() {
        return id_meta;
    }

    public void setId_meta(Meta id_meta) {
        this.id_meta = id_meta;
    }

    public double getTotal_mes() {
        return total_mes;
    }

    public void setTotal_mes(double total_mes) {
        this.total_mes = total_mes;
    }

}
