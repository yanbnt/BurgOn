package com.burgeron.model;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
public class Usuario {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String password;
    private String cpf;
    private int idCargo; // 0 - Cliente, 1 - Cozinheiro, 2 - Administrador
    private String cep;
    private String celular;
    private String bairro;
    private String logradouro;
    private String numero;
    private String complemento;
    private String cidade;
    private String uf;
    public Usuario() {}
}

