package com.burgeron.controller;

import com.burgeron.dto.LoginRequest;
import com.burgeron.dto.LoginResponse;
import com.burgeron.model.Cliente;
import com.burgeron.repository.ClienteRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
public class LoginController {
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("api/clientes/loginSuccess")
    public ModelAndView getMethodName() {
        return new ModelAndView("pedido");
    }
    
    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Optional<Cliente> clienteExistente = clienteRepository.findByEmail(loginRequest.getEmail());
        if(clienteExistente.isEmpty()) {
            return ResponseEntity.badRequest().body(new LoginResponse(null,"Cliente não encontrado com este email."));
        }

        Cliente cliente = clienteExistente.get();

        // Lógica de autenticação
        if (cliente.getPassword().equals(loginRequest.getPassword())) {
            String token = "simulated_jwt_token_12345";
            return ResponseEntity.ok(new LoginResponse(token, "Login bem-sucedido!"));
        } else {
            return ResponseEntity.status(401).body(new LoginResponse(null, "Credenciais inválidas."));
        }
    }
}

