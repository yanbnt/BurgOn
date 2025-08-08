package com.burgeron.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoRequest {
    private List<ItemPedidoRequest> itens;
    private String formaPagamento;

    @Getter
    @Setter
    public static class ItemPedidoRequest {
        private Long id;
        private int quantidade;
    }
}
