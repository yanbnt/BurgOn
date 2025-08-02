package com.burgeron.repository;
import com.burgeron.model.Cliente; // Importa a classe Cliente do pacote model
import java.util.Optional; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email); 
    Optional<Cliente> findByCpf(String cpf); 
} 
