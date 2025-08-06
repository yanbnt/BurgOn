package com.burgeron.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.burgeron.model.Ingrediente;
import com.burgeron.model.IngredienteProduto;
import java.util.List;


@Repository
public interface IngredienteProdutoRepository extends JpaRepository<IngredienteProduto, Long>{
    @Query("SELECT ip.ingrediente FROM IngredienteProduto ip WHERE ip.produto.id = :produtoId")
    List<Ingrediente> findIngredientesByProdutoId(@Param("produtoId") Long produtoId);

    @Query("SELECT ip.ingrediente, ip.quantidade FROM IngredienteProduto ip WHERE ip.produto.id = :produtoId")
    List<Object[]> findIngredientesAndQuantitiesByProdutoId(@Param("produtoId") Long produtoId);
}
