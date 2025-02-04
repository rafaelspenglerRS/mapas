// exibição dos aeroportos  
var airportLayer = L.layerGroup().addTo(map);
var iconsAir = {
    "Asfalto": L.icon({ iconUrl: './img/airAsphalt.png', iconSize: [32, 32], iconAnchor: [16, 32] }),
    "Concreto": L.icon({ iconUrl: './img/airConcrete.png', iconSize: [32, 32], iconAnchor: [16, 32] })
};

function loadMarkersAir(geojsonFile) {
    fetch(geojsonFile)
        .then(response => response.json())
        .then(data => {
            airportLayer.clearLayers();
            L.geoJSON(data, {
                filter: function (feature) {
                    return feature.properties.superfíci !== undefined; // Apenas adiciona aeroportos com superfície definida
                },
                pointToLayer: function (feature, latlng) {
                    var surfaceType = feature.properties.superfíci || "default";
                    var iconeAir = iconsAir[surfaceType] || icons["default"];

                    //|| icons["default"];
                    
                    // Criar um marcador com ícone personalizado SEM o padrão do Leaflet
                    return L.marker(latlng, {
                        icon: iconeAir,
                        interactive: true, // Permite que os ícones sejam clicáveis
                        keyboard: false // Remove a interação com o teclado
                    }).bindPopup(
                        `<b>${feature.properties.NOME}</b><br>Superfície: ${surfaceType}`
                    );
                }
            }).addTo(airportLayer);
        });
}
document.getElementById('airports').addEventListener('change', function (event) {
    var legendAir = document.querySelector('.legendAir');
    if (event.target.checked) {
        loadMarkersAir('https://raw.githubusercontent.com/rafaelspenglerRS/mapas/main/aeroportosRS20241.geojson');
        map.addLayer(airportLayer);
        legendAir.style.display = 'block';
    } else {
        // Só remover layer se explicitamente desativado
        if (map.hasLayer(airportLayer)) {
            map.removeLayer(airportLayer);
        }
        legendAir.style.display = 'none';
    }
});