package com.burgeron.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.burgeron.model.Produto;
import com.burgeron.repository.ProdutoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    @Autowired 
    private ProdutoRepository pedidoRepository;

    @GetMapping("/pedidos")
    public List<Produto> listarPedidos() {
        return pedidoRepository.findAll();
    }
}
