package com.burgeron.controller;
import com.burgeron.dto.CadastroRequest;
import com.burgeron.dto.UsuarioRequest;
import com.burgeron.dto.MensagemResponse;
import com.burgeron.model.Usuario;
import com.burgeron.repository.UsuarioRepository;
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
@RequestMapping("/api/usuario") // Mapeia as requisições para o caminho /api/usuarios
public class UsuarioController {

    // Controlador para gerenciar o cadastro de usuarios
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para exibir a página de cadastro
    @GetMapping("/cadastrar")
    public String cadastrar() {
        return "cadastro.html";
    }

    @GetMapping("/editar/{id}")
    public Usuario buscarUsuarioPorId(@PathVariable Long id) {
    // Lógica para buscar um único usuario pelo ID no banco de dados
        return usuarioRepository.findById(id).orElse(null);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<MensagemResponse> alterarusuario(@PathVariable Long id, @RequestBody UsuarioRequest usuarioRequest) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return ResponseEntity.badRequest().body(new MensagemResponse("Usuario não encontrado."));
        }
        usuario.setNome(usuarioRequest.getNome());
        usuario.setEmail(usuarioRequest.getEmail());
        usuario.setCelular(usuarioRequest.getCelular());
        usuario.setCep(usuarioRequest.getCep());
        usuario.setLogradouro(usuarioRequest.getLogradouro());
        usuario.setBairro(usuarioRequest.getBairro());
        usuario.setCidade(usuarioRequest.getLocalidade()); 
        usuario.setNumero(usuarioRequest.getNumero());
        usuario.setUf(usuarioRequest.getUf());
        usuario.setComplemento(usuarioRequest.getComplemento());
        usuarioRepository.save(usuario); // SEMPRE É O REPOSITORIO QUE SALVA, EXCLUI E ALTERA
        return ResponseEntity.ok(new MensagemResponse("Usuario atualizado com sucesso."));
    
    }

    // Endpoint para processar o cadastro de usuarios
    @PostMapping("/cadastrar")
    public ResponseEntity<MensagemResponse> registrarusuario(@RequestBody CadastroRequest registroRequest) {
        
        // Lógica de validação do registro
        if (registroRequest.getNome() == null || registroRequest.getNome().isEmpty() ||
            registroRequest.getEmail() == null || registroRequest.getEmail().isEmpty() ||
            registroRequest.getPassword() == null || registroRequest.getPassword().isEmpty() ||
            registroRequest.getCpf() == null || registroRequest.getCpf().isEmpty())
            {return ResponseEntity.badRequest().body(new MensagemResponse("Todos os campos são obrigatórios."));}
        
        // Verifica se o email ou CPF já estão cadastrados
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(registroRequest.getEmail());
        if(usuarioExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new MensagemResponse("Já existe um usuario cadastrado com este email."));
        }

        // Verifica se o CPF já está cadastrado
        usuarioExistente = usuarioRepository.findByCpf(registroRequest.getCpf());
        if(usuarioExistente.isPresent()) {
            return ResponseEntity.badRequest().body(new MensagemResponse("CPF já cadastrado."));
        }

        // Cria um novo usuario e salva no repositório
        Usuario novousuario = new Usuario();
        novousuario.setNome(registroRequest.getNome());
        novousuario.setEmail(registroRequest.getEmail());
        novousuario.setPassword(registroRequest.getPassword());
        novousuario.setCpf(registroRequest.getCpf());
        novousuario.setIdCargo(0); // Nível padrão para novos usuarios
        
        usuarioRepository.save(novousuario);
        
        // Se tudo correr bem, retorna uma resposta de sucesso
        return ResponseEntity.ok(new MensagemResponse("Cadastro realizado com sucesso!"));
    }
    
}
