package com.burgeron.controller;

import com.burgeron.dto.LoginRequest;
import com.burgeron.dto.LoginResponse;
import com.burgeron.model.Usuario;
import com.burgeron.repository.UsuarioRepository;

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
    private UsuarioRepository usuarioRepository;

    @GetMapping("api/usuario/loginSuccess")
    public ModelAndView getMethodName() {
        return new ModelAndView("pedido");
    }
    
    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(loginRequest.getEmail());
        if(usuarioExistente.isEmpty()) {
            return ResponseEntity.badRequest().body(new LoginResponse("Cliente não encontrado com este email."));
        }

        Usuario usuario = usuarioExistente.get();

        // Lógica de autenticação
        if (usuario.getPassword().equals(loginRequest.getPassword())) {
            String token = "simulated_jwt_token_12345";
            return ResponseEntity.ok(new LoginResponse(usuario.getId(),token, "Login bem-sucedido!",usuario.getNome(), usuario.getEmail(), usuario.getIdCargo()));
        } else {
            return ResponseEntity.status(401).body(new LoginResponse("Credenciais inválidas."));
        }
    }
}

