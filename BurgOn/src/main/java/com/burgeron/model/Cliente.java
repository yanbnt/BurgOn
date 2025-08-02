package com.burgeron.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Cliente extends Usuario {
    private String enderecoEntrega;
    private String telefoneContato;
    private String preferencias;

    public Cliente() {} 
    public Cliente(String nome, String email, String password, String cpf, int nivel,
                   String enderecoEntrega, String telefoneContato, String preferencias) {
        super(nome, email, password, cpf, nivel);
        this.enderecoEntrega = enderecoEntrega;
        this.telefoneContato = telefoneContato;
        this.preferencias = preferencias;
    }
}  

