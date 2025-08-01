package com.burgeron.controller;
import com.burgeron.dto.RegistroRequest;
import com.burgeron.dto.RegistroResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @PostMapping("/cadastrar")
    public ResponseEntity<RegistroResponse> registrarCliente(@RequestBody RegistroRequest registroRequest) {
        // A partir daqui, o Spring Boot já converteu o JSON da requisição
        // para o objeto RegistroRequest.

        // Lógica de validação do registro
        if (registroRequest.getNome() == null || registroRequest.getNome().isEmpty() ||
            registroRequest.getEmail() == null || registroRequest.getEmail().isEmpty() ||
            registroRequest.getPassword() == null || registroRequest.getPassword().isEmpty() ||
            registroRequest.getCpf() == null || registroRequest.getCpf().isEmpty()) {
            return ResponseEntity.badRequest().body(new RegistroResponse("Todos os campos são obrigatórios."));
        }

        // Simulação da regra de negócio RN01: Restrição de cadastro.
        // A lógica real aqui iria verificar se o e-mail ou o CPF já existem
        // na base de dados.
        // Por exemplo:
        // if (clienteService.emailExiste(registroRequest.getEmail())) {
        //     return ResponseEntity.status(409).body(new RegistroResponse("E-mail já cadastrado."));
        // }
        // if (clienteService.cpfExiste(registroRequest.getCpf())) {
        //     return ResponseEntity.status(409).body(new RegistroResponse("CPF já cadastrado."));
        // }

        // Lógica para guardar o novo cliente na base de dados.
        // Por exemplo:
        // Cliente novoCliente = new Cliente(registroRequest.getNome(), ...);
        // clienteService.salvarCliente(novoCliente);

        // Se tudo correr bem, retorna uma resposta de sucesso
        return ResponseEntity.ok(new RegistroResponse("Cadastro realizado com sucesso!"));
    }
}
