	// função para exibição das cidades
    function loadGeoJSON(geojsonFile, nameProperty) {
        if (geoJsonLayer) {
            map.removeLayer(geoJsonLayer);
        }
        fetch(geojsonFile)
            .then(response => response.json())
            .then(data => {
                geoJsonLayer = L.geoJSON(data, {
                    style: () => ({ color: '#A1CFB8', weight: 1, fillOpacity: 0.5 }),
                    onEachFeature: function (feature, layer) {
                        let nome = feature.properties[nameProperty] || "Desconhecido";
                        layer.on({
                            mouseover: function (e) {
                                if (e.target.setStyle && e.target.feature && e.target.feature.geometry.type.includes("Polygon")) {
                                    e.target.setStyle({ color: '#82C0A1', weight: 3, fillOpacity: 0.8 });
                                    e.target.bindTooltip(nome, { permanent: false, direction: "top" }).openTooltip();
                                }
                            },
                            mouseout: function (e) {
                                if (e.target.setStyle && e.target.feature && e.target.feature.geometry.type.includes("Polygon")) {
                                    if (selectedLayer !== e.target) {
                                        e.target.setStyle({ color: '#A1CFB8', weight: 1, fillOpacity: 0.5 });
                                    }
                                }
                            },
                            click: function (e) {
                                if (selectedLayer) {
                                    selectedLayer.setStyle({ color: '#A1CFB8', weight: 1, fillOpacity: 0.5 });
                                }
                                selectedLayer = e.target;
                                e.target.setStyle({ color: '#fdc75f', weight: 2, fillOpacity: 0.9 });
                                let nomeFormatado = nome.toLowerCase().replace(/ /g, '-');
                                let ibgeLink = `https://cidades.ibge.gov.br/brasil/rs/${nomeFormatado}/panorama`;
                                L.popup({ closeButton: false, autoPan: true })
                                    .setLatLng(e.latlng)
                                    .setContent(`<b>${nome}</b><br><a href='${ibgeLink}' target='_blank'>Mais informações</a>`)
                                    .openOn(map);
                            }
                        });
                    }
                }).addTo(map);
            });
    }