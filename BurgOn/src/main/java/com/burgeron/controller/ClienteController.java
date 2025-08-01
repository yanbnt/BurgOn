package com.burgeron.controller;
import com.burgeron.dto.RegistroRequest;
import com.burgeron.dto.RegistroResponse;
import com.burgeron.model.Cliente;
import com.burgeron.repository.ClienteRepository;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/cadastrar")
    public ModelAndView cadastrar() {
        return new ModelAndView("cadastro");
    }
    

    @PostMapping("/cadastrar")
    public ResponseEntity<RegistroResponse> registrarCliente(@RequestBody RegistroRequest registroRequest) {
        
        
        // Lógica de validação do registro
        if (registroRequest.getNome() == null || registroRequest.getNome().isEmpty() ||
            registroRequest.getEmail() == null || registroRequest.getEmail().isEmpty() ||
            registroRequest.getPassword() == null || registroRequest.getPassword().isEmpty() ||
            registroRequest.getCpf() == null || registroRequest.getCpf().isEmpty()) {
            return ResponseEntity.badRequest().body(new RegistroResponse("Todos os campos são obrigatórios."));
        }
        
        Optional<Cliente> clienteExistente = clienteRepository.findByEmail(registroRequest.getEmail());
        if(clienteExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new RegistroResponse("Já existe um cliente cadastrado com este email."));
        }
        
        clienteExistente = clienteRepository.findByCpf(registroRequest.getCpf());
        if(clienteExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new RegistroResponse("CPF já cadastrado."));
        }
        

        Cliente novoCliente = new Cliente();
        novoCliente.setNome(registroRequest.getNome());
        novoCliente.setEmail(registroRequest.getEmail());
        novoCliente.setPassword(registroRequest.getPassword());
        novoCliente.setCpf(registroRequest.getCpf());

        clienteRepository.save(novoCliente);
        
        // Se tudo correr bem, retorna uma resposta de sucesso
        return ResponseEntity.ok(new RegistroResponse("Cadastro realizado com sucesso!"));
    }
}
