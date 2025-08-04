package com.burgeron.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    
    private Long userId;
    private String token;
    private String message;
    private String nome;
    private String email;
    private int idCargo; // 0 - Cliente, 1 - Cozinheiro, 2 - Administrador
    public LoginResponse(String message) {
        this.message = message;
    }
}

