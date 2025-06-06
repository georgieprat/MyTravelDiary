import { hoverclick } from './Hover-Click-Logic.js';
import { Searcher } from './SearchFuncV2.js';

const userAgent = navigator.userAgent.toLowerCase();

if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
    window.isMobile = true;
    console.log("Mobile device");
} else {
    window.isMobile = false;
    console.log("Desktop device");
}

// Add blur on page load
document.body.classList.add('StartMenu-active');

// Remove overlay and restore styles on any click
document.getElementById('StartMenu').addEventListener('click', function () {
    document.getElementById('StartMenu').style.display = 'none';
    document.body.classList.remove('StartMenu-active');
    if (window.isMobile === false) {
        const box = document.getElementById('countrySearch');
        box.focus();
    }
});

document.getElementById('map').addEventListener('click', function () {
    if (window.isMobile === false) {
        const box = document.getElementById('countrySearch');
        box.focus();
    } else {
        const box = document.getElementById('countrySearch');
        box.blur();
    }
});

var bounds = L.latLngBounds(
    L.latLng(-60, -180),
    L.latLng(85, 185)
);

const minZ = window.isMobile === true ? 1 : 3;

console.log("minZ: ", minZ)

var map = L.map('map', {
    minZoom: minZ,
    maxZoom: 10,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,  // Fully restrict dragging outside
    zoomSnap: 0.5
}).setView([40, 0], 2);

// Add default tile layer
baseLayers.Light.addTo(map);

//L.control.layers(defaultLayer, baseLayers.Dark).addTo(map);

let selectedCountries = [];

function updateSelectedUI() {
    document.getElementById('selectedCount').innerText = `Travelled Countries: ${selectedCountries.length}`;
    // Also update dropdown, if needed
}

// Load GeoJSON and add interactivity
let geojson;
const countryLayers = {};

fetch('CNTR_RG_01M_2020/CNTR_RG_01M_2020_4326_2.json')
    .then(res => res.json())
    .then(data => {
        console.log('GeoJSON data:', data);

        // Check for FeatureCollection
        if (data.type !== 'FeatureCollection') {
            console.error('Expected a FeatureCollection but got:', data.type);
            return;
        }

        geojson = L.geoJSON(data, {
            style: Styles.Default,

            onEachFeature: function (feature, layer) {

                if (feature.properties) {
                    const keys = [
                        'CNTR_NAME',
                        'NAME_ENGL',
                        'NAME_FREN',
                        'NAME_GERM',
                        'ISO3_CODE',
                        'CNTR_ID'
                    ];
                    
                    keys.forEach(key => {
                        const value = feature.properties[key];
                        if (value) {
                            countryLayers[value.toLowerCase()] = layer;
                        }
                    });
                }

                hoverclick(layer);
                
            }
        }).addTo(map);

        const dropdown = document.getElementById('selectedCountries');

        // After you've created the geojson layer
        //Dropdown(geojson, dropdown);

        Searcher(countryLayers, map)

    });

document.getElementById('reset').addEventListener('click', function () {
    geojson.eachLayer(function (layer) {
        layer.setStyle(Styles.Default);
        layer.selected = false;
        layer.isDropdownHighlighted = false;
        document.getElementById('selectedCountries').innerHTML = '';
        let selectedCount = 0;
        document.getElementById('selectedCount').innerText = `Travelled Countries: 0`;
        window.flaeche = 0;
        document.getElementById('area').innerText =
        `Area Combined: ${flaeche} 1000*km2`;
        });
});
