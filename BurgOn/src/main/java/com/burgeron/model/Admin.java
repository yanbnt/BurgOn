package com.burgeron.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Admin extends Usuario {
    
    public Admin() {}
    public Admin(String nome, String email, String password, String cpf, int nivel) {
        super(nome, email, password, cpf, nivel);
    }

}
