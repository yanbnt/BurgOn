package com.burgeron.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String descricao;
    private String dataHora;
    private String usuarioId;
    private String produtoId;
    private String quantidade;
    private String enderecoEntrega;
    private Double preco;
    private String status;
}
