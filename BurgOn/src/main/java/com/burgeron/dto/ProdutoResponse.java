package com.burgeron.dto;

import java.util.List;
import com.burgeron.model.Ingrediente;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoResponse {
    private Long id;
    private String nome;
    private List<Ingrediente> ingredientes;
    private String descricao;
    private Double preco;
    private String imagem;
    private String categoria;
}
