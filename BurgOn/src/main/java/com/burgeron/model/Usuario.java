package com.burgeron.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
//@MappedSuperclass
public class Usuario {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String password;
    private String cpf;
    private int idCargo; // 0 - Cliente, 1 - Cozinheiro, 2 - Administrador

    public Usuario() {}
    public Usuario(String nome, String email, String password, String cpf, int idCargo) {
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.idCargo = idCargo;
    }
}

