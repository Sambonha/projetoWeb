🖥️ Front-End — Agenda de Tarefas
📖 Descrição do Projeto

Aplicação desenvolvida em Angular
 para consumir a API de gerenciamento de tarefas e categorias, permitindo criar, editar, listar e excluir registros de forma prática e organizada.

Tecnologias e recursos utilizados:

Angular 17+
 — Framework SPA moderno

Componentização e organização modular

RxJS
 para serviços assíncronos

Formulários Reativos (Reactive Forms)

Bootstrap para estilização e responsividade

Integração completa com a API REST desenvolvida em Spring Boot

BACK END DO PROJETO ➝ (https://github.com/Sambonha/apiAgenda
)

🏗️ Organização do Projeto

O projeto segue uma estrutura simples e funcional, dividido em:

Components → Telas e seções do sistema (tarefas, categorias, menu, formulários etc.)

Services → Comunicação com a API de tarefas e categorias

Models → Interfaces de tipagem para objetos (Tarefa, Categoria, etc.)

Pages → Telas principais (listar, criar, editar, excluir)

Assets → Ícones, imagens, fontes e recursos gerais

Styles → Estilos globais e variáveis

🧩 Teoria: Angular

O Angular é um framework front-end mantido pela Google e focado na criação de aplicações SPA (Single Page Applications).
Principais conceitos usados no projeto:

Componentes → Estrutura base da aplicação

Módulos → Agrupamento de funcionalidades

Services → Pontos centrais para lógica e integração com a API

Injeção de Dependência (DI) → Facilita organização e manutenção

Data Binding → Comunicação entre template e lógica

Rotas → Navegação entre páginas sem recarregar a aplicação

No projeto, essas ferramentas foram aplicadas para criar um front-end intuitivo, organizado e fácil de escalar.

🌐 Comunicação com a API

O consumo da API é feito via HttpClient, respeitando o padrão REST:

GET → listar tarefas/categorias

POST → criar

PUT → editar

DELETE → excluir

Os serviços centralizam todas as chamadas para manter o código limpo e reutilizável.
