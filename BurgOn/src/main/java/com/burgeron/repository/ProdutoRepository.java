package com.burgeron.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.burgeron.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Optional<Produto> findByNome(String nome);
    
    /**
     * Busca todos os produtos e, para cada um, carrega antecipadamente (eagerly)
     * suas associações com IngredienteProduto e os respectivos Ingredientes.
     * O DISTINCT evita produtos duplicados no resultado.
     * Isso resolve o problema de consulta N+1, pois tudo é carregado em uma única query.
     */
    @Query("SELECT DISTINCT p FROM Produto p LEFT JOIN FETCH p.ingredienteProduto ip LEFT JOIN FETCH ip.ingrediente")
    List<Produto> findAllWithIngredients();
} 
