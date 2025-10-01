# Perto de Mim 📍

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)

## Sobre o Projeto

Este é um projeto que desenvolvi para a disciplina de `CODING: MOBILE` do curso de `Analíse e desenvolvimento de sistemas`. A proposta era criar uma aplicação web moderna que demonstrasse o uso de tecnologias e recursos atuais do navegador.
E claro, com uma ajuda do amigos de todos(IA).

O "Perto de Mim" é um **Progressive Web App (PWA)** simples e funcional que ajuda o usuário a encontrar pontos de interesse, como cafeterias, restaurantes e parques, em sua vizinhança.

O desafio era construir uma aplicação que atendesse a três requisitos principais:
1.  Ser um **PWA (Progressive Web App)**, ou seja, ser instalável e ter capacidades offline.
2.  Fazer uso de **recursos de hardware** do dispositivo (neste caso, a **Geolocalização**).
3.  Consumir dados de uma **API pública** (utilizei a Overpass API, que fornece dados do OpenStreetMap).

## Principais Funcionalidades

- 📱 **PWA Instalável:** O site pode ser "instalado" no celular ou no computador, funcionando como um aplicativo nativo.
- 🗺️ **Uso de Geolocalização:** Ao clicar em uma categoria, o app solicita a permissão de localização para buscar estabelecimentos próximos ao usuário.
- ☕ **Busca por Categorias:** Criei botões para as categorias mais comuns (Cafeterias, Restaurantes e Parques) para facilitar a busca.
- 🎨 **Interface Limpa e Responsiva:** Desenvolvi um layout moderno e agradável, que se adapta bem a diferentes tamanhos de tela. Os resultados são exibidos em formato de cards de fácil leitura.
- 🔗 **Link para o Mapa:** Cada resultado oferece um link direto para abrir a localização no Google Maps, facilitando a navegação até o local.

## Tecnologias Utilizadas

Para construir este projeto, utilizei as seguintes tecnologias:

- **HTML5** para a estrutura da página.
- **CSS3** para a estilização, com foco em Flexbox para criar um layout responsivo.
- **JavaScript (ES6+)** para toda a lógica da aplicação, incluindo:
  - Manipulação do DOM.
  - Chamadas à API de Geolocalização do navegador.
  - Requisições `fetch` para consumir a API Overpass.
- **PWA (Progressive Web App):**
  - **Manifest.json** para definir como o app deve se comportar ao ser instalado.
  - **Service Worker** para gerenciar o cache e permitir o funcionamento offline básico.
- **API:** [Overpass API](https://overpass-api.de/) para consultar os dados do [OpenStreetMap](https://www.openstreetmap.org/).

## Como Executar o Projeto

Como este é um projeto front-end puro, não há necessidade de um back-end complexo.

1. Clone este repositório:
   ```bash
   git clone [https://github.com/](https://github.com/)[seu-usuario]/[nome-do-repositorio].git
   ```
2. Navegue até a pasta do projeto.
3. Para uma experiência completa e para que a API de Geolocalização funcione corretamente, é necessário rodar o projeto a partir de um servidor local. Recomendo usar a extensão **Live Server** do Visual Studio Code.


---

Desenvolvido por **João Ricardo Vieira de Vasconcelos**
