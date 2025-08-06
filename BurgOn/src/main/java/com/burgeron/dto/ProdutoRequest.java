package com.burgeron.dto;

import java.util.List;
import com.burgeron.model.Ingrediente;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoRequest {
    private String nome;
    private List<Ingrediente> ingredientes;
    private Double preco;
    private String imagem;
    private String categoria;

}
