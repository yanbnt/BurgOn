package com.burgeron.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.burgeron.dto.PedidoRequest;
import com.burgeron.model.ItemPedido;
import com.burgeron.model.Pedido;
import com.burgeron.model.Produto;
import com.burgeron.repository.PedidoRepository;
import com.burgeron.repository.ProdutoRepository;

import jakarta.transaction.Transactional;

@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    @Transactional
    public Pedido criarPedido(PedidoRequest pedidoRequest) {
        Pedido pedido = new Pedido();
        pedido.setCodigo(UUID.randomUUID().toString());
        pedido.setDataHora(LocalDateTime.now());
        pedido.setFormaPagamento(pedidoRequest.getFormaPagamento());
        pedido.setStatus("Recebido");

        List<ItemPedido> itensPedido = pedidoRequest.getItens().stream().map(itemDto -> {
            Produto produto = produtoRepository.findById(itemDto.getId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + itemDto.getId()));
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemDto.getQuantidade());
            itemPedido.setPrecoUnitario(produto.getPreco());
            return itemPedido;
        }).collect(Collectors.toList());

        pedido.setItens(itensPedido);

        double valorTotal = itensPedido.stream()
                .mapToDouble(item -> item.getPrecoUnitario() * item.getQuantidade()).sum();
        pedido.setValorTotal(valorTotal);

        return pedidoRepository.save(pedido);
    }
}
