const dropdown = document.getElementById('selectedCountries');

export function Searcher(countryLayers, map) {
    const input = document.getElementById('countrySearch');

    let currentLayer = null;
    const originalView = {
        center: map.getCenter(),
        zoom: map.getZoom()
    };

    input.addEventListener('input', function (e) {
        window.query = e.target.value.toLowerCase();

        if (countryLayers[query]) {
            currentLayer = countryLayers[query];
            currentName = currentLayer.feature.properties.NAME_ENGL.toLowerCase();

            console.log("CurrentLayer is being Highlighted")
            currentLayer.setStyle(Styles.Highlighted);
        } else {

            if (currentName) {
                if (countryLayers[currentName].selected === true) {
                    console.log("CurrentLayer was Selected")
                    currentLayer.setStyle(Styles.Selected);
                } else {
                    console.log("CurrentLayer was not Selected")
                    currentLayer.setStyle(Styles.Default);
                }
            }
        }
    });

    input.addEventListener('keydown', function (e) {
        console.log(query)
        if (e.key === 'Enter' && query === ""){

            map.setView(originalView.center, originalView.zoom);

            setTimeout(() => {
                input.select();
            }, 0);
        }
        else if (e.key === 'Enter' && currentLayer) {
            e.preventDefault();
            map.fitBounds(currentLayer.getBounds());

            window.countryName = currentLayer.feature.properties.NAME_ENGL.toLowerCase();

            Selected(countryLayers, currentLayer, countryName, dropdown)

            console.log(countryName)
            countryLayers[countryName].selected = true;

            setTimeout(() => {
                input.select();
            }, 0);

        }
    });
}