package com.burgeron.repository;
//import com.burgeron.model.Cliente; // Importa a classe Cliente do pacote model
import com.burgeron.model.Usuario;

import java.util.Optional; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email); 
    Optional<Usuario> findByCpf(String cpf); 
} 
