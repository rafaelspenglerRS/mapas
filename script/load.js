// Territórios
document.getElementById('regionsIntermediate').addEventListener('change', function () {
    loadGeoJSON(regionFiles.intermediate, "nome_rgint");
});
document.getElementById('regionsImmediate').addEventListener('change', function () {
    loadGeoJSON(regionFiles.immediate, "nome_rgi");
});
document.getElementById('regionsMunicipalities').addEventListener('change', function () {
    loadGeoJSON(regionFiles.municipalities, "NOME");
});

// Infraestrutura
document.getElementById('airports').addEventListener('change', function () {
    if (this.checked) {
        loadMarkersAir(infraFiles.airports);
    } else {
        airportLayer.clearLayers();
    }
});
document.getElementById('aerodrome').addEventListener('change', function () {
    if (this.checked) {
        loadMarkersAer(infraFiles.aerodrome);
    } else {
        aerodromeLayer.clearLayers();
    }
});
document.getElementById('hidrovia').addEventListener('change', function () {
    if (this.checked) {
        loadMarkersHid(infraFiles.hidrovia);
    } else {
        hidroviaLayer.clearLayers();
    }
});