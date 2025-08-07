package com.burgeron.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoResponse {
    private Long id;
    private String nome;
    private List<IngredienteResponse> ingredientes;
    private String descricao;
    private Double preco;
    private String imagem;
    private String categoria;

    public ProdutoResponse(Long id, String nome, String descricao, Double preco, String imagem, String categoria) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.imagem = imagem;
        this.categoria = categoria;
    }
}
