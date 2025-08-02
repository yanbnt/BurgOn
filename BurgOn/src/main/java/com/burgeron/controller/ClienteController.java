package com.burgeron.controller;
import com.burgeron.dto.CadastroRequest;
import com.burgeron.dto.ClienteRequest;
import com.burgeron.dto.MensagemResponse;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



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

    @GetMapping("/editar/{id}")
    public Cliente buscarClientePorId(@PathVariable Long id) {
    // Lógica para buscar um único cliente pelo ID no banco de dados
        return clienteRepository.findById(id).orElse(null);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<MensagemResponse> alterarCliente(@PathVariable Long id, @RequestBody ClienteRequest clienteRequest) {
        Cliente cliente = clienteRepository.findById(id).orElse(null);
        if (cliente == null) {
            return ResponseEntity.badRequest().body(new MensagemResponse("Cliente não encontrado."));
        }
        cliente.setNome(clienteRequest.getNome());
        cliente.setEmail(clienteRequest.getEmail());
        cliente.setCelular(clienteRequest.getCelular());
        cliente.setCep(clienteRequest.getCep());
        cliente.setLogradouro(clienteRequest.getLogradouro());
        cliente.setBairro(clienteRequest.getBairro());
        cliente.setCidade(clienteRequest.getLocalidade()); 
        cliente.setNumero(clienteRequest.getNumero());
        cliente.setUf(clienteRequest.getUf());
        cliente.setComplemento(clienteRequest.getComplemento());
        clienteRepository.save(cliente); // SEMPRE É O REPOSITORIO QUE SALVA, EXCLUI E ALTERA
        return ResponseEntity.ok(new MensagemResponse("Cliente atualizado com sucesso."));
    
    }

    // Endpoint para processar o cadastro de clientes
    @PostMapping("/cadastrar")
    public ResponseEntity<MensagemResponse> registrarCliente(@RequestBody CadastroRequest registroRequest) {
        
        // Lógica de validação do registro
        if (registroRequest.getNome() == null || registroRequest.getNome().isEmpty() ||
            registroRequest.getEmail() == null || registroRequest.getEmail().isEmpty() ||
            registroRequest.getPassword() == null || registroRequest.getPassword().isEmpty() ||
            registroRequest.getCpf() == null || registroRequest.getCpf().isEmpty())
            {return ResponseEntity.badRequest().body(new MensagemResponse("Todos os campos são obrigatórios."));}
        
        // Verifica se o email ou CPF já estão cadastrados
        Optional<Cliente> clienteExistente = clienteRepository.findByEmail(registroRequest.getEmail());
        if(clienteExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new MensagemResponse("Já existe um cliente cadastrado com este email."));
        }

        // Verifica se o CPF já está cadastrado
        clienteExistente = clienteRepository.findByCpf(registroRequest.getCpf());
        if(clienteExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new MensagemResponse("CPF já cadastrado."));
        }

        // Cria um novo cliente e salva no repositório
        Cliente novoCliente = new Cliente();
        novoCliente.setNome(registroRequest.getNome());
        novoCliente.setEmail(registroRequest.getEmail());
        novoCliente.setPassword(registroRequest.getPassword());
        novoCliente.setCpf(registroRequest.getCpf());
        novoCliente.setIdCargo(0); // Nível padrão para novos clientes
        
        clienteRepository.save(novoCliente);
        
        // Se tudo correr bem, retorna uma resposta de sucesso
        return ResponseEntity.ok(new MensagemResponse("Cadastro realizado com sucesso!"));
    }
    
}
