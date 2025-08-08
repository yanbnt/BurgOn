package com.burgeron.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PedidoResponse {
    private String message;
    private Long pedidoId;
}
