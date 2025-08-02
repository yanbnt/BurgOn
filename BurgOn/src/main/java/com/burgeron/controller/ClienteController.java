package com.burgeron.controller;
import com.burgeron.dto.CadastroRequest;
import com.burgeron.dto.CadastroResponse;
import com.burgeron.model.Cliente;
import com.burgeron.repository.ClienteRepository;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController // Define que esta classe é um controlador REST
@RequestMapping("/api/clientes") // Mapeia as requisições para o caminho /api/clientes
public class ClienteController {

    // Controlador para gerenciar o cadastro de clientes
    @Autowired
    private ClienteRepository clienteRepository;

    // Endpoint para exibir a página de cadastro
    @GetMapping("/cadastrar")
    public String cadastrar() {
        return "cadastro.html";
    }

    // Endpoint para processar o cadastro de clientes
    @PostMapping("/cadastrar")
    public ResponseEntity<CadastroResponse> registrarCliente(@RequestBody CadastroRequest registroRequest) {
        
        // Lógica de validação do registro
        if (registroRequest.getNome() == null || registroRequest.getNome().isEmpty() ||
            registroRequest.getEmail() == null || registroRequest.getEmail().isEmpty() ||
            registroRequest.getPassword() == null || registroRequest.getPassword().isEmpty() ||
            registroRequest.getCpf() == null || registroRequest.getCpf().isEmpty())
            {return ResponseEntity.badRequest().body(new CadastroResponse("Todos os campos são obrigatórios."));}
        
        // Verifica se o email ou CPF já estão cadastrados
        Optional<Cliente> clienteExistente = clienteRepository.findByEmail(registroRequest.getEmail());
        if(clienteExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new CadastroResponse("Já existe um cliente cadastrado com este email."));
        }

        // Verifica se o CPF já está cadastrado
        clienteExistente = clienteRepository.findByCpf(registroRequest.getCpf());
        if(clienteExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new CadastroResponse("CPF já cadastrado."));
        }

        // Cria um novo cliente e salva no repositório
        Cliente novoCliente = new Cliente();
        novoCliente.setNome(registroRequest.getNome());
        novoCliente.setEmail(registroRequest.getEmail());
        novoCliente.setPassword(registroRequest.getPassword());
        novoCliente.setCpf(registroRequest.getCpf());
        novoCliente.setEnderecoEntrega("");
        novoCliente.setTelefoneContato("");
        novoCliente.setPreferencias("");
        novoCliente.setIdCargo(0); // Define o nível como 0 para cliente padrão
        
        clienteRepository.save(novoCliente);
        
        // Se tudo correr bem, retorna uma resposta de sucesso
        return ResponseEntity.ok(new CadastroResponse("Cadastro realizado com sucesso!"));
    }
    
}
