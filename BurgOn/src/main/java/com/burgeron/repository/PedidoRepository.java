package com.burgeron.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.burgeron.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
}
