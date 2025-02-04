var hidroviaLayer = L.layerGroup().addTo(map);

var iconsHidro = {
    "eclusa": L.icon({ 
        iconUrl: './img/eclusa.png', 
        iconSize: [16, 16], 
        iconAnchor: [16, 16]
    })
};

var coresPorClassificacao = {
    'navegável': 'blue',
    'navegação inexpressiva': 'orangered'
};

function loadMarkersHid(geojsonFile) {
    fetch(geojsonFile)
        .then(response => response.json())
        .then(data => {
            hidroviaLayer.clearLayers();

            L.geoJSON(data, {
                style: function(feature) {
                    if (feature.geometry.type === "MultiLineString") {
                        var classificacao = feature.properties.cla_icacao ? feature.properties.cla_icacao.trim().toLowerCase() : "";
                        var cor = coresPorClassificacao[classificacao] || 'gray';

                        console.log(`🛥️ Aplicando cor para ${feature.properties.NOME} - Classificação: ${classificacao}`);

                        return {
                            color: cor,  
                            weight: 2,
                            opacity: 1,
                            dashArray: "3",
                        };
                    }
                },
                filter: function (feature) { 
    
                    return feature.geometry.type === "MultiLineString";
                }
            }).addTo(hidroviaLayer);

            // Adicionar marcadores para eclusas baseadas em MultiLineString
            data.features.forEach(feature => {
                if (feature.geometry.type === "MultiLineString" && feature.properties.tipo === "Eclusa") {
                    var coords = feature.geometry.coordinates[0][0]; // Pega o primeiro ponto da linha

                    if (coords) {
                        var latlng = L.latLng(coords[1], coords[0]); // Leaflet usa [lat, lng]
                        L.marker(latlng, { icon: iconsHidro["eclusa"] }).addTo(hidroviaLayer);
                    }
                }
            });
        })
        .catch(error => console.error("⚠️ Erro ao carregar GeoJSON:", error));
}

document.getElementById('hidrovia').addEventListener('change', function (event) {
    var legendHidro = document.querySelector('.legendHidro');
    if (event.target.checked) {
        loadMarkersHid('https://raw.githubusercontent.com/rafaelspenglerRS/mapas/main/hidroviasRS2024.geojson');
        map.addLayer(hidroviaLayer);
        legendHidro.style.display = 'block';
    } else {
        if (map.hasLayer(hidroviaLayer)) {
            map.removeLayer(hidroviaLayer);
        }
        legendHidro.style.display = 'none';
    }
});
