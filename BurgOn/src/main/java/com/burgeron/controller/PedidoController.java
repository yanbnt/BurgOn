package com.burgeron.controller;

import com.burgeron.dto.MensagemResponse;
import com.burgeron.dto.PedidoRequest;
import com.burgeron.dto.PedidoResponse;
import com.burgeron.model.Pedido;
import com.burgeron.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/finalizar")
    public ResponseEntity<?> finalizarPedido(@RequestBody PedidoRequest pedidoRequest) {
        try {
            Pedido novoPedido = pedidoService.criarPedido(pedidoRequest);
            return ResponseEntity.ok(new PedidoResponse("Pedido recebido com sucesso!", novoPedido.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MensagemResponse(e.getMessage()));
        }
    }

    // Se precisar de um endpoint para listar pedidos, pode ser algo assim:
    @GetMapping
    public List<Pedido> listarPedidos() {
        // Aqui você precisaria implementar a busca de pedidos no seu PedidoService
        // Exemplo simples:
        // return pedidoService.listarTodos();
        return null; // Placeholder
    }
}
