package com.burgeron.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.burgeron.model.Ingrediente;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Integer>{
    Optional<Ingrediente> findByNome(String nome);
}
