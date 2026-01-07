# BurgOn — Sistema para Hamburgueria

Aplicação web para gestão de uma hamburgueria, com fluxo completo de catálogo, carrinho/pagamento e administração de produtos, ingredientes e usuários. Backend em Spring Boot (REST + JPA/MySQL) e frontend estático em `resources/static`.

## Visão Geral
- Clientes podem navegar pelos produtos, montar pedidos e finalizar pagamento.
- Administração gerencia produtos, ingredientes/estoque e perfis de usuários.
- API REST com DTOs e relacionamentos mapeados em JPA.

## Principais Recursos
- Autenticação básica de usuário (token simulado na resposta de login).
- Usuários: cadastro com validação (e-mail/CPF), busca e edição de perfil/endereço.
- Produtos: cadastro, edição, exclusão e listagem com ingredientes, preço, imagem e categoria.
- Ingredientes: cadastro e listagem; controle de quantidade e quantidade mínima.
- Pedidos: criação a partir dos itens, cálculo de total, status inicial "Recebido", código único e data/hora.
- Páginas estáticas para início, login, cadastro, carrinho, pagamento, pedidos, perfil e telas de gestão.

## Stack Técnica
- Java 17, Spring Boot 3.5 (Web Services, Data JPA, DevTools, Thymeleaf)
- Hibernate Validator, Lombok
- MySQL Connector/J (persistência em MySQL)

## Endpoints (Resumo)
```
POST   /api/login                         # Autenticação
POST   /api/usuario/cadastrar             # Cadastro de usuário
GET    /api/usuario/editar/{id}           # Buscar usuário por ID
PUT    /api/usuario/editar/{id}           # Editar usuário

GET    /api/produto/consultar             # Listar produtos (com ingredientes)
POST   /api/produto/cadastrar             # Cadastrar produto
PUT    /api/produto/editar/{id}           # Editar produto
DELETE /api/produto/excluir/{id}          # Excluir produto

GET    /api/ingredientes/consultar        # Listar ingredientes
POST   /api/ingredientes/cadastrar        # Cadastrar ingrediente

POST   /api/pedidos/finalizar             # Finalizar/criar pedido
```

## Configuração
As principais propriedades estão em `BurgOn/src/main/resources/application.properties`:

```
spring.profiles.active=dev
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/burger-on
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:root}
spring.jpa.show-sql=true
```

Variáveis de ambiente suportadas: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`.

## Como Rodar (Windows)
Pré-requisitos: JDK 17, MySQL em execução, Maven (ou usar o wrapper).

1) Criar o banco de dados:
```sql
CREATE DATABASE `burger-on` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2) (Opcional) Definir variáveis de ambiente no PowerShell:
```powershell
$env:DB_HOST="localhost"
$env:DB_PORT="3306"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="root"
```

3) Executar a aplicação com o Maven Wrapper:
```powershell
cd BurgOn
./mvnw.cmd spring-boot:run
```

Aplicação padrão em: http://localhost:8080

Arquivos estáticos (frontend) em: `BurgOn/src/main/resources/static`.

## Estrutura do Projeto (resumo)
```
BurgOn/
    src/main/java/com/burgeron/
        controller/  # Endpoints REST (Produto, Ingrediente, Pedido, Usuario, Login)
        dto/         # DTOs de requisição e resposta
        model/       # Entidades JPA (Produto, Ingrediente, Pedido, Usuario, etc.)
        repository/  # Repositórios Spring Data JPA
        service/     # Regras de negócio (PedidoService, etc.)
    src/main/resources/
        application.properties
        static/      # HTML/CSS/JS das telas do cliente e administração
```

## Próximos Passos Sugeridos
- Trocar token simulado por autenticação JWT real.
- Completar listagem/consulta de pedidos no `PedidoController`.
- Implementar baixa de estoque por pedido e alertas de mínimo.
- Documentar API com OpenAPI/Swagger.
- Adicionar testes automatizados.

---

Projeto criado para fins educacionais e práticos de gestão de hamburguerias.
