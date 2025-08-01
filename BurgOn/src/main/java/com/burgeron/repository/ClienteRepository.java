package com.burgeron.repository;
import com.burgeron.model.Cliente;

import java.util.Optional; //Serve para buscar um cliente pelo email ou CPF

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email); 
    Optional<Cliente> findByCpf(String cpf);
} 
