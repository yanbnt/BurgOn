package com.burgeron.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredienteResponse {
    private Long idIngrediente;
    private String nome;
    private int quantidade;
    private int quantidadeMinima;

    public IngredienteResponse(Long idIngrediente, String nome, int quantidade) {
        this.idIngrediente = idIngrediente;
        this.nome = nome;
        this.quantidade = quantidade;
    }
}
