T# Nextesk API

API REST da aplicação de gerenciamento de tarefas Nextesk, construída com Spring Boot e PostgreSQL.

##  Demo

Frontend: [nextesk-web.vercel.app](https://nextesk-web.vercel.app)

##  Tecnologias

- **Java 21**
- **Spring Boot 3.5**
- **Spring Data JPA**
- **PostgreSQL** (Supabase)
- **Lombok**
- **Docker**

  Funcionalidades

- CRUD completo de tarefas
- Suporte a sub-tarefas
- API RESTful com respostas em JSON
- CORS configurado para integração com o frontend
- Containerizado com Docker


##  Deploy

Este projeto está hospedado em:
- **Render** — hospeda a aplicação Spring Boot via Docker
- **Supabase** — banco de dados PostgreSQL gerenciado

##  Estrutura do Projeto

src/
└── main/
└── java/com/taskman/nextesk/
├── controller/    # Controladores REST
├── model/         # Entidades JPA
├── repository/    # Camada de acesso a dados
└── service/       # Regras de negócio



