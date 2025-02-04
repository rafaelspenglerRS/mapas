// exibição dos aeródromos  
var aerodromeLayer = L.layerGroup().addTo(map);
var icons = {
    "Asfalto": L.icon({ iconUrl: './img/aerAsphalt.png', iconSize: [32, 32], iconAnchor: [16, 32] }),
    "Concreto": L.icon({ iconUrl: './img/aerConcrete.png', iconSize: [32, 32], iconAnchor: [16, 32] }),
    "Grama": L.icon({ iconUrl: './img/aerGrass.png', iconSize: [32, 32], iconAnchor: [16, 32] }),
    "Saibro": L.icon({ iconUrl: './img/aerClay.png', iconSize: [32, 32], iconAnchor: [16, 32] }),
    "Terra": L.icon({ iconUrl: './img/aerDirt_.png', iconSize: [32, 32], iconAnchor: [16, 32] }),
    "default": L.icon({ iconUrl: './img/aerUnknown_.png', iconSize: [32, 32], iconAnchor: [16, 32] })
};

function loadMarkersAer(geojsonFile) {
    fetch(geojsonFile)
        .then(response => response.json())
        .then(data => {
            aerodromeLayer.clearLayers();
            L.geoJSON(data, {
                filter: function (feature) {
                    return feature.properties.superfíci !== undefined; // Apenas adiciona aeroportos com superfície definida
                },
                pointToLayer: function (feature, latlng) {
                    var surfaceType = feature.properties.superfíci || "default";
                    var icone = icons[surfaceType] || icons["default"];

                    //|| icons["default"];
                    
                    // Criar um marcador com ícone personalizado SEM o padrão do Leaflet
                    return L.marker(latlng, {
                        icon: icone,
                        interactive: true, // Permite que os ícones sejam clicáveis
                        keyboard: false // Remove a interação com o teclado
                    }).bindPopup(
                        `<b>${feature.properties.NOME}</b><br>Superfície: ${surfaceType}`
                    );
                }
            }).addTo(aerodromeLayer);
        });
}
document.getElementById('aerodrome').addEventListener('change', function (event) {
    var legend = document.querySelector('.legend');
    if (event.target.checked) {
        loadMarkersAer('https://raw.githubusercontent.com/rafaelspenglerRS/mapas/main/aerodromosRS2024.geojson');
        map.addLayer(aerodromeLayer);
        legend.style.display = 'block';
    } else {
        // Só remover layer se explicitamente desativado
        if (map.hasLayer(aerodromeLayer)) {
            map.removeLayer(aerodromeLayer);
        }
        legend.style.display = 'none';
    }
});