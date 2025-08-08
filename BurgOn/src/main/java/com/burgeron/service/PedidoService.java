package com.burgeron.service;

import com.burgeron.dto.PedidoRequest;
import com.burgeron.model.Pedido;

public interface PedidoService {
    Pedido criarPedido(PedidoRequest pedidoRequest);
}
