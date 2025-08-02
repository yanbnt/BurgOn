Projeto BurgerOn
Visão Geral do Projeto
Este é o back-end para o sistema de hamburgueria BurgerOn, desenvolvido para o curso superior de Tecnologia em Análise e Desenvolvimento de Sistemas da FAETERJ-RIO. O objetivo é criar um sistema que permita aos clientes navegar pelo cardápio, realizar pedidos, efetuar pagamentos online e acompanhar o status dos seus pedidos em tempo real, desde a confirmação até à entrega.

Tecnologias Utilizadas
O projeto é dividido em duas partes principais:

Front-end
HTML: Estrutura das páginas da web.

CSS/Tailwind CSS: Estilização da interface, garantindo um design moderno e responsivo.

JavaScript: Lógica de interação do utilizador, chamadas à API e manipulação do DOM.

Back-end
Spring Boot: Framework principal para o desenvolvimento da API REST.

Java: Linguagem de programação.

Maven: Ferramenta de gestão de dependências.

Lombok: Para reduzir o boilerplate (código repetitivo) nas classes DTO e de modelo.

H2 Database: Banco de dados em memória para desenvolvimento e testes.

JPA/Hibernate: Para a camada de persistência de dados.

Estrutura do Projeto
A estrutura de ficheiros e pastas do projeto Spring Boot está organizada por pacotes, conforme as boas práticas de arquitetura em camadas:

src/main/java
└── com
    └── burgeron
        ├── controller
        │   ├── AuthController.java
        │   └── CardapioController.java
        ├── dto
        │   ├── LoginRequest.java
        │   ├── LoginResponse.java
        │   ├── RegistroRequest.java
        │   └── RegistroResponse.java
        ├── model
        │   └── ItemCardapio.java
        ├── repository
        │   └── ItemCardapioRepository.java
        └── service
            └── CardapioService.java

Endpoints da API (Back-end)
A API REST do projeto expõe os seguintes endpoints:

POST /api/auth/login: Realiza a autenticação do utilizador.

POST /api/clientes/cadastrar: Regista um novo cliente no sistema.

GET /api/cardapio: Lista todos os itens do cardápio.

Ficheiros de Banco de Dados
O projeto utiliza um script SQL para criar a tabela item_cardapio e inserir os dados iniciais. Este script é executado automaticamente pelo Spring Boot na inicialização da aplicação, desde que esteja no diretório correto.

src/main/resources/cardapio_data.sql

Como Inicializar o Projeto
Para executar o projeto, siga estes passos:

Pré-requisitos:

Java Development Kit (JDK) 17 ou superior.

Maven.

Uma IDE como IntelliJ IDEA, VS Code ou Eclipse.

Configuração do Banco de Dados:

Certifique-se de que o ficheiro cardapio_data.sql está no diretório src/main/resources.

Execução da Aplicação:

Abra o projeto na sua IDE.

Execute a classe principal da sua aplicação Spring Boot (por exemplo, BurgeronApplication.java).

Aceder ao Front-end:

Com a aplicação em execução, aceda aos ficheiros estáticos pelo navegador, por exemplo:

http://localhost:8080/index.html (Tela de Login)

http://localhost:8080/registro.html (Tela de Registro)

http://localhost:8080/pedido.html (Tela de Pedido)
