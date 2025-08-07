package com.burgeron.controller;

import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.burgeron.dto.MensagemResponse;
import com.burgeron.dto.ProdutoRequest;
import com.burgeron.dto.IngredienteResponse;
import com.burgeron.dto.ProdutoResponse;
import com.burgeron.model.Ingrediente;
import com.burgeron.model.IngredienteProduto;
import com.burgeron.model.Produto;
import com.burgeron.repository.IngredienteProdutoRepository;
import com.burgeron.repository.ProdutoRepository;
import com.burgeron.service.ProdutoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/produto")
public class ProdutoController {
    
    @Autowired
    ProdutoRepository produtoRepository;
    @Autowired
    IngredienteProdutoRepository ingredienteProdutoRepository;
    

    @GetMapping("/consultar")
    public List<ProdutoResponse> listarProdutos() {
        // 1. Busca todos os produtos com seus ingredientes em uma única consulta para evitar o problema N+1.
        List<Produto> produtos = produtoRepository.findAllWithIngredients();
        
        // 2. Mapeia as entidades `Produto` para `ProdutoResponse` DTOs em memória.
        return produtos.stream().map(produto -> {
            // Mapeia o produto principal
            ProdutoResponse response = new ProdutoResponse(
                produto.getId(),
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getImagemUrl(),
                produto.getCategoria()
            );
            // Mapeia a lista de ingredientes associados
            List<IngredienteResponse> ingredienteResponses = produto.getIngredienteProduto().stream()
                .map(ingredienteProduto -> new IngredienteResponse(
                    ingredienteProduto.getIngrediente().getId(),
                    ingredienteProduto.getIngrediente().getNome(),
                    ingredienteProduto.getQuantidade()))
                .collect(Collectors.toList());
            response.setIngredientes(ingredienteResponses);
            return response;
        }).collect(Collectors.toList());
    }

    @Transactional
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<MensagemResponse> excluirProduto(@PathVariable Long id){
        ingredienteProdutoRepository.deleteByProdutoId(id);
        produtoRepository.deleteById(id);
        return ResponseEntity.ok(new MensagemResponse("Produto excluído com sucesso!"));
    }
    

    @Transactional
    @PutMapping("/editar/{id}")
    public ResponseEntity<MensagemResponse> alterarProduto(@PathVariable Long id, @RequestBody ProdutoRequest produtoRequest) {
        Produto produto = produtoRepository.findById(id).orElse(null);
        if (produto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MensagemResponse("Produto não encontrado."));
        }

        produto.setNome(produtoRequest.getNome());
        produto.setPreco(produtoRequest.getPreco());
        produto.setImagemUrl(produtoRequest.getImagem());
        produto.setCategoria(produtoRequest.getCategoria());
        produto.setDescricao(ProdutoService.criaDescricao(produtoRequest.getIngredientes()));
        
        ingredienteProdutoRepository.deleteByProdutoId(id);
        
        // 2. Adiciona as novas associações de ingredientes.
        for (Ingrediente ingrediente : produtoRequest.getIngredientes()) {
            IngredienteProduto ingredienteProduto = new IngredienteProduto();
            ingredienteProduto.setProduto(produto);
            ingredienteProduto.setIngrediente(ingrediente);
            ingredienteProduto.setQuantidade(ingrediente.getQuantidade());
            ingredienteProdutoRepository.save(ingredienteProduto);
        }

        return ResponseEntity.ok(new MensagemResponse("Produto atualizado com sucesso."));
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

        Produto novoProduto = new Produto();
        novoProduto.setNome(produtoRequest.getNome());
        novoProduto.setPreco(produtoRequest.getPreco());
        novoProduto.setImagemUrl(produtoRequest.getImagem());
        novoProduto.setCategoria(produtoRequest.getCategoria());
        novoProduto.setDescricao(ProdutoService.criaDescricao(produtoRequest.getIngredientes()));
        novoProduto = produtoRepository.save(novoProduto);
        
        for (Ingrediente ingrediente : produtoRequest.getIngredientes()) {
            IngredienteProduto ingredienteProduto = new IngredienteProduto();
            ingredienteProduto.setIngrediente(ingrediente);
            ingredienteProduto.setProduto(novoProduto);
            ingredienteProduto.setQuantidade(ingrediente.getQuantidade());
            ingredienteProdutoRepository.save(ingredienteProduto);
        }

        return ResponseEntity.ok(new MensagemResponse("Produto cadastrado com sucesso!"));

    }

}
