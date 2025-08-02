package com.burgeron.service;

//import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.burgeron.repository.AdminRepository;


@Service
@Profile("dev")
public class VerificaAdm implements CommandLineRunner{
    @Autowired
    private AdminRepository adminRepository;
    @Override
    @Transactional
    public void run(String... args) throws Exception{
        if(adminRepository.count() > 0){
            System.out.println("Ja existem administradores cadastrados no banco de dados.");
            return;
        }
        /*        // Criação de produtos fictícios usando Faker
        Faker faker = new Faker(Locale.forLanguageTag("pt-BR"));
        Produto produto;
        
        for(int i = 0; i < 10; i++){
            produto = new Produto();
            produto.setNome(faker.food().dish());
            produto.setDescricao(produto.getNome());
            produto.setPreco(faker.number().randomDouble(2, 5, 50));
            //produto.setImagem(faker.image().imageUrl(640, 480, "food", true));
            produtoRepository.save(produto);
            
        }*/

    }

}
