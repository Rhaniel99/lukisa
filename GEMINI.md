# Contexto do Projeto Lukisa para o Gemini

## 1. Visão Geral do Projeto

Este é um projeto monorepo que visa englobar múltiplos subprojetos dentro de uma única base de código Laravel. A ideia é ter uma aplicação central que orquestra diferentes módulos, cada um com sua própria funcionalidade.

- **Idioma Principal de Comunicação:** Português do Brasil.

## 2. Stack de Tecnologia

A arquitetura do projeto é moderna e totalmente dockerizada, utilizando os seguintes serviços e tecnologias:

-   **Backend:**
    -   **Framework:** Laravel
    -   **Arquitetura:** Modularizada com a biblioteca `nwidart/laravel-modules`.
    -   **Banco de Dados:** PostgreSQL e Redis.
    -   **Filas e Jobs:** Laravel Horizon.
    -   **Real-time/WebSockets:** Laravel Reverb.
-   **Frontend:**
    -   **Framework:** Inertia.js com React e TypeScript.
    -   **Componentes UI:** Utiliza `shadcn/ui`.
-   **Infraestrutura:**
    -   **Containerização:** Totalmente dockerizado com Docker Compose.
    -   **Serviços Docker:** `nginx`, `php`, `artisan`, `node`, `reverb`, `horizon`, `redis`.

## 3. Módulos e Funcionalidades Atuais

O projeto está dividido em módulos, cada um representando uma funcionalidade ou subprojeto.

### Módulo: `Memories` (Mapa Interativo)

-   **Objetivo:** Permitir que usuários postem uma foto com texto em um mapa interativo. Usuários podem interagir com as postagens de outros.
-   **Funcionalidades Principais:**
    -   Visualização de postagens (memórias) em um mapa.
    -   Criação de novas memórias com título, descrição e mídia (imagem) em coordenadas específicas.
    -   Interações como "curtir" (`like`) e comentar em memórias.
    -   As interações de like e comentários são atualizadas em tempo real via WebSockets (Reverb).

### Módulo: `Authentication`

-   **Objetivo:** Gerenciar todo o fluxo de autenticação, registro e perfil de usuário.
-   **Funcionalidades Principais:**
    -   Registro de novos usuários.
    -   Login e Logout.
    -   Funcionalidade de "Esqueci minha senha".
    -   Criação/Atualização de perfil de usuário com nome de usuário e avatar.

### Módulo Futuro: `PolluxProject`

-   **Objetivo:** Será um "homelab" para organizar e servir vídeos, filmes e séries.
-   **Status:** O desenvolvimento ainda não foi iniciado.

## 4. Padrões de Código e Preferências

Para manter a consistência e a qualidade, siga estas diretrizes ao gerar código ou sugestões:

-   **Linguagem:** Forneça respostas e exemplos de código em **Português do Brasil**.
-   **Backend (PHP/Laravel):**
    -   Utilize **DTOs (Data Transfer Objects)** com o pacote `spatie/laravel-data` para todas as entradas de dados (Requests) e saídas (Respostas de API/ViewModels).
    -   Respeite a arquitetura modular. Novas funcionalidades devem ser encapsuladas em seus respectivos módulos.
    -   Siga a estrutura de **Services** e **Repositories** para a lógica de negócio e acesso a dados.
-   **Frontend (React/TypeScript):**
    -   Utilize componentes da biblioteca `shadcn/ui` sempre que possível.
    -   Siga as boas práticas de componentização e hooks do React.
    -   Mantenha a tipagem forte com TypeScript, utilizando os tipos definidos em `resources/js/Types/models.d.ts`.
-   **Geral:**
    -   As respostas devem ser claras, objetivas e com exemplos de código quando aplicável.
    -   Priorize soluções que se integrem bem com a stack tecnológica existente (Inertia, Reverb, Horizon, etc.).