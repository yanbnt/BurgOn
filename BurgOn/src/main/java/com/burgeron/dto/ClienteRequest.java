package com.burgeron.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteRequest {
    private String nome;
    private String email;
    private String celular;
    private String cep;
    private String endereco;
    private String bairro;
    private String logradouro;
    private String numero;
    private String complemento;
    private String localidade;
    private String uf;
}
