package com.burgeron.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredienteRequest {
    private String nome;
    private int quantidade;
    private int quantidadeMinima;
}
