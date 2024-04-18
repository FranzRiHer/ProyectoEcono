package com.example.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


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

    @Column(columnDefinition = "integer default 0")
    private int saldo = 0; // Explícitamente inicializado a 0

    @Column(columnDefinition = "integer default 0")
    private int egresoTotal = 0; // Inicializado a 0L para Long

    @Column(columnDefinition = "integer default 0")
    private int ingresoTotal = 0; // Inicializado a 0L para Long

    private String username;

    String password;
    @Enumerated(EnumType.STRING) 
    private Rol rol;
    
    @JsonIgnoreProperties("usuario")
    @OneToMany(mappedBy = "usuario" , cascade = CascadeType.ALL)
    private List<Egreso> egresos;

    @JsonIgnoreProperties("usuario")
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Ingreso> ingresos;

    @JsonIgnoreProperties("usuario")
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Meta> metas;

    @JsonIgnoreProperties("usuario")
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<CategoriaEgreso> categoriasEgreso;

    @JsonIgnoreProperties("usuario")
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<CategoriaIngreso> categoriasIngreso;


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

    public int getEgresoTotal() {
        return egresoTotal;
    }

    public void setEgresoTotal(int egresoTotal) {
        this.egresoTotal = egresoTotal;
    }

    public int getIngresoTotal() {
        return ingresoTotal;
    }

    public void setIngresoTotal(int ingresoTotal) {
        this.ingresoTotal = ingresoTotal;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority((rol.name())));
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
       return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
       return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
    public List<Ingreso> getIngresos() {
        return ingresos;
    }

    public void setIngresos(List<Ingreso> ingresos) {
        this.ingresos = ingresos;
    }

    public List<Egreso> getEgresos() {
        return egresos;
    }

    public void setEgresos(List<Egreso> egresos) {
        this.egresos = egresos;
    }

    public void setMeta(List<Meta> metas){
        this.metas = metas;
    }
    
    public List<Meta> getMetas(){
        return metas;
    }

    public List<CategoriaEgreso> getCategoriasEgreso() {
        return categoriasEgreso;
    }

    public void setCategoriasEgreso(List<CategoriaEgreso> categoriasEgreso) {
        this.categoriasEgreso = categoriasEgreso;
    }

    public List<CategoriaIngreso> getCategoriasIngreso() {
        return categoriasIngreso;
    }

    public void setCategoriasIngreso(List<CategoriaIngreso> categoriasIgreso) {
        this.categoriasIngreso = categoriasIgreso;
    }

}