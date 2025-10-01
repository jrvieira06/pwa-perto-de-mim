// Define um nome e versão para o nosso cache
const CACHE_NAME = 'perto-de-mim-cache-v1';

// Lista de arquivos que queremos que fiquem salvos (nosso "app shell")
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// 1. Evento de Instalação: Ocorre quando o Service Worker é instalado.
self.addEventListener('install', event => {
  // Espera até que a promessa dentro de waitUntil seja resolvida
  event.waitUntil(
    // Abre o cache com o nome que definimos
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        // Adiciona todos os arquivos da nossa lista ao cache
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Evento de Fetch: Ocorre toda vez que o app faz uma requisição (ex: pede uma imagem, um css, etc.)
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar a requisição no cache
    caches.match(event.request)
      .then(response => {
        // Se a resposta for encontrada no cache, a retorna
        if (response) {
          return response;
        }
        // Se não, faz a requisição para a rede
        return fetch(event.request);
      })
  );
});