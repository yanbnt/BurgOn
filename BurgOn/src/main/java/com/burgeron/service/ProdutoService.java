package com.burgeron.service;

import java.util.List;
import com.burgeron.model.Ingrediente;

public class ProdutoService {
    public static String criaDescricao(List<Ingrediente> ingredientes){
        StringBuilder descricao = new StringBuilder();
        for (Ingrediente ingrediente : ingredientes) {
            descricao.append(ingrediente.getNome());
            descricao.append(", ");
        }
        return descricao.toString();
    }
}
