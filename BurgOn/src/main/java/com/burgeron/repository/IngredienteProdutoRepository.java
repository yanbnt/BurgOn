package com.burgeron.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.burgeron.dto.IngredienteResponse;
import com.burgeron.model.IngredienteProduto;
import java.util.List;


@Repository
public interface IngredienteProdutoRepository extends JpaRepository<IngredienteProduto, Long>{
    @Query("SELECT NEW com.burgeron.dto.IngredienteResponse(ip.ingrediente.id, ip.ingrediente.nome, ip.quantidade) " +
              "FROM IngredienteProduto ip "+ 
              "WHERE ip.produto.id = :produtoId")
    List<IngredienteResponse> findIngredientesAndQuantitiesByProdutoId(@Param("produtoId") Long produtoId);
}
