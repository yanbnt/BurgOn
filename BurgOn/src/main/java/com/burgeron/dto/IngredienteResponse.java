package com.burgeron.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredienteResponse {
    private Long id;
    private String nome;
    private int quantidade;
    private int quantidadeMinima;

    public IngredienteResponse(Long id, String nome, int quantidade) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
    }
}
