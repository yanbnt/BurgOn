package com.burgeron.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.burgeron.dto.MensagemResponse;
import com.burgeron.dto.ProdutoRequest;
import com.burgeron.dto.ProdutoResponse;
import com.burgeron.model.Ingrediente;
import com.burgeron.model.IngredienteProduto;
import com.burgeron.model.Produto;
import com.burgeron.repository.IngredienteProdutoRepository;
import com.burgeron.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/produto")
public class ProdutoController {
    
    @Autowired
    ProdutoRepository produtoRepository;
    @Autowired
    IngredienteProdutoRepository ingredienteProdutoRepository;
    
    @GetMapping("/consultar")
    public List<ProdutoResponse> listarProdutos() {
        List<ProdutoResponse> listaProdutos =  produtoRepository.findAllResponse();

        listaProdutos.stream().forEach(
            produto -> {
                produto.setIngredientes(ingredienteProdutoRepository.findIngredientesAndQuantitiesByProdutoId(produto.getId()));
            }
        );

        return listaProdutos;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<MensagemResponse> registraProduto(@RequestBody ProdutoRequest produtoRequest) {
        
        // Lógica de validação do registro
        if (produtoRequest.getNome() == null || produtoRequest.getNome().isEmpty() ||
            produtoRequest.getIngredientes() == null || produtoRequest.getIngredientes().isEmpty()||
            produtoRequest.getPreco()== 0.0)
            {
                return ResponseEntity.badRequest().body(new MensagemResponse("Todos os campos são obrigatórios."));
            }
        
        
        Optional<Produto> produtoExistente = produtoRepository.findByNome(produtoRequest.getNome());
        if(produtoExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new MensagemResponse("Produto já cadastrado."));
        }
        IngredienteProduto ingredienteProduto = new IngredienteProduto();
        Produto novoProduto = new Produto();
        novoProduto.setNome(produtoRequest.getNome());
        novoProduto.setPreco(produtoRequest.getPreco());
        novoProduto.setImagemUrl(produtoRequest.getImagem());
        novoProduto.setCategoria(produtoRequest.getCategoria());
        StringBuilder descricao = new StringBuilder();
        //
        for (Ingrediente ingrediente : produtoRequest.getIngredientes()) {
            descricao.append(ingrediente.getNome());
            descricao.append(", ");
        }
        novoProduto.setDescricao(descricao.toString());
        novoProduto = produtoRepository.save(novoProduto);
        
        for (Ingrediente ingrediente : produtoRequest.getIngredientes()) {
            ingredienteProduto = new IngredienteProduto();
            ingredienteProduto.setIngrediente(ingrediente);
            ingredienteProduto.setProduto(novoProduto);
            ingredienteProduto.setQuantidade(ingrediente.getQuantidade());
            ingredienteProdutoRepository.save(ingredienteProduto);
        }

        return ResponseEntity.ok(new MensagemResponse("Produto cadastrado com sucesso!"));

    }

}
