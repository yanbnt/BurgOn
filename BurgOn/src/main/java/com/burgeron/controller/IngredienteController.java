package com.burgeron.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.burgeron.dto.IngredienteRequest;
import com.burgeron.dto.MensagemResponse;
import com.burgeron.model.Ingrediente;
import com.burgeron.repository.IngredienteRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/api/ingredientes")
public class IngredienteController {
    
    @Autowired
    IngredienteRepository ingredienteRepository;
    
    @GetMapping("/consultar")
    public List<Ingrediente> listaIngredientes() {
        return ingredienteRepository.findAll();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<MensagemResponse> registraingrediente(@RequestBody IngredienteRequest ingredienteRequest) {
        
        // Lógica de validação do registro
        if (ingredienteRequest.getNome() == null || ingredienteRequest.getNome().isEmpty() ||
            ingredienteRequest.getQuantidadeMinima() == 0){
                return ResponseEntity.badRequest().body(new MensagemResponse("Todos os campos são obrigatórios."));}
        
        Optional<Ingrediente> ingredienteExistente = ingredienteRepository.findByNome(ingredienteRequest.getNome());
        if(ingredienteExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new MensagemResponse("Ingrediente já cadastrado."));
        }

        Ingrediente novoIngrediente = new Ingrediente();
        novoIngrediente.setNome(ingredienteRequest.getNome());
        novoIngrediente.setQuantidade(ingredienteRequest.getQuantidade());
        novoIngrediente.setQuantidadeMinima(ingredienteRequest.getQuantidadeMinima());
        ingredienteRepository.save(novoIngrediente);
        return ResponseEntity.ok(new MensagemResponse("Ingrediente cadastrado com sucesso!"));

    }

}
