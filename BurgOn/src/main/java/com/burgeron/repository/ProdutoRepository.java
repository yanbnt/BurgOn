package com.burgeron.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.burgeron.dto.ProdutoResponse;
import com.burgeron.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Optional<Produto> findByNome(String nome);
    
    @Query("SELECT NEW com.burgeron.dto.ProdutoResponse(p.id, p.nome, p.descricao, p.preco, p.imagemUrl, p.categoria) FROM Produto p")
    List<ProdutoResponse> findAllResponse();
} 
