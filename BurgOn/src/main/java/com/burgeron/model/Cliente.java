package com.burgeron.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Entity
@AllArgsConstructor
@Getter
@Setter
public class Cliente extends Usuario {
    private String cep;
    private String celular;
    private String preferencias;
    private String bairro;
    private String logradouro;
    private String numero;
    private String complemento;
    private String cidade;
    private String uf;


    public Cliente() {} 
     
}  

