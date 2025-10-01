// Espera a página carregar completamente para garantir que os botões já existem
document.addEventListener('DOMContentLoaded', () => {
    // 1. Pega todos os botões dentro da div #controls
    const buttons = document.querySelectorAll('#controls button');
    
    // 2. Adiciona um "escutador" de clique para cada botão
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Quando um botão é clicado, pega o valor do atributo 'data-query'
            const queryType = button.getAttribute('data-query');
            // Chama a função principal para iniciar a busca
            findNearbyPlaces(queryType);
        });
    });
});

// 3. Função principal que pede a geolocalização
function findNearbyPlaces(type) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '<p style="text-align:center;">Obtendo sua localização...</p>';

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // Com a localização em mãos, chama a função da API
                fetchFromOverpassAPI(lat, lon, type);
            }, 
            (error) => {
                console.error("Erro ao obter localização: ", error);
                resultsContainer.innerHTML = '<p style="text-align:center; color:red;">Não foi possível obter sua localização. Verifique as permissões do navegador.</p>';
            }
        );
    } else {
        resultsContainer.innerHTML = '<p style="text-align:center; color:red;">Geolocalização não é suportada pelo seu navegador.</p>';
    }
}

// 4. Função que busca os dados na API Overpass (versão atualizada com o loader)
async function fetchFromOverpassAPI(lat, lon, type) {
    const resultsContainer = document.getElementById('results-container');
    // Mostra o spinner de carregamento
    resultsContainer.innerHTML = '<div class="loader"></div>'; 
    
    const radius = 1000;
    const query = `
        [out:json];
        (
          node["amenity"="${type}"](around:${radius},${lat},${lon});
          way["amenity"="${type}"](around:${radius},${lat},${lon});
          relation["amenity"="${type}"](around:${radius},${lat},${lon});
        );
        out center;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Chama a função para mostrar os resultados no novo formato de card
        displayResults(data.elements, type);
    } catch (error) {
        console.error('Erro ao buscar dados na API Overpass:', error);
        resultsContainer.innerHTML = '<p style="text-align:center; color:red;">Ocorreu um erro ao buscar os locais. Tente novamente.</p>';
    }
}

// 5. Função que mostra os resultados (versão atualizada com os cards)
function displayResults(places, type) {
    const resultsContainer = document.getElementById('results-container');

    if (places.length === 0) {
        resultsContainer.innerHTML = `<p style="text-align:center;">Nenhuma(o) ${type} encontrada(o) nas proximidades.</p>`;
        return;
    }

    resultsContainer.innerHTML = ''; 
    
    places.forEach(place => {
        if (place.tags && place.tags.name) {
            const name = place.tags.name;
            const lat = place.lat || place.center.lat;
            const lon = place.lon || place.center.lon;
            const mapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

            const placeDiv = document.createElement('div');
            placeDiv.className = 'place-item';
            placeDiv.innerHTML = `
                <strong>${name}</strong>
                <a href="${mapsLink}" target="_blank">Ver no mapa</a>
            `;
            resultsContainer.appendChild(placeDiv);
        }
    });
}

// 6. Registra o Service Worker para o PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}