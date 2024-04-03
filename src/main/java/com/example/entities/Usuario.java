package com.example.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre; 
    private String email;
    private int saldo;
    @Column(columnDefinition = "integer default 0")
    private Long egresoTotal;
    @Column(columnDefinition = "integer default 0")
    private Long ingresoTotal;
    private String username;
    String password;
    @Enumerated(EnumType.STRING) 
    Rol rol;

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
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority((rol.name())));
    }
    @Override
    public boolean isAccountNonExpired() {
       return true;
    }
    @Override
    public boolean isAccountNonLocked() {
       return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }

}