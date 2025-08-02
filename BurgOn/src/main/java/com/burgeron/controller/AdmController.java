package com.burgeron.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.burgeron.repository.AdminRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController // Controller para gerenciar as operações administrativas
@RequestMapping("/admin") // Mapeia as requisições para o caminho /api/admin
public class AdmController {
    @Autowired
    private AdminRepository adminRepository;

    @GetMapping("/cadastrar")
    public String cadastroProdutos() {
        return "cadastro-produtos.html"; // Retorna a página de cadastro de produtos
    }


    
}
