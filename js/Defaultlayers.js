window.baseLayers = {
    "OSM Standard": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),

    "OpenTopo": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
    }),

    "Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CartoDB'
    }),
    "Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CartoDB'
    }),

    "StamenWatercolor": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap.'
    }),
    "StamenToner": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap.'
    }),
    "StamenTerrain": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap.'
    })
};

window.Styles = {
    Default: {
        weight: 0.5,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.2
    },
    Selected: {
        fillColor: 'yellow', 
        color: 'orange',
        weight: 0.5,
        fillOpacity: 0.2
    },
    Highlighted: {
        fillColor: 'red', 
        color: 'red',
        weight: 3,
        fillOpacity: 0.2
    }
};

window.flaeche = 0;
window.currentName = 0;

window.area = function(currentLayer,pm) {

    const area = turf.area(currentLayer.feature); // in square meters
    const areaKm2 = Math.round(area / 1e9);

    if (pm === 1) {
        window.flaeche = flaeche + areaKm2;
    } else if (pm === 0) {
        window.flaeche = flaeche - areaKm2;
    } else {
        console.log("Area Error")
    }

    // Update the counter display
    document.getElementById('area').innerText =
    `Area Combined: ${flaeche} 1000*km2`;

}