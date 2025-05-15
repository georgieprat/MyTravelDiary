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
            //currentName = currentLayer.feature.properties.NAME_ENGL.toLowerCase();

            // Highlight
            currentLayer.setStyle(Styles.Highlighted);

        } else {
            map.setView(originalView.center, originalView.zoom);

            if (currentLayer) {


                currentLayer.selected = countryLayers[countryName].selected

                if (!currentLayer.selected) {
                    //dropdown.remove(option);
                    console.log("I'm here")
                    currentLayer.setStyle(Styles.Default);
                    
                    area(currentLayer,0)

                } else if (currentLayer.isDropdownHighlighted === true) {
                    currentLayer.setStyle(Styles.Highlighted); 
                } else {
                    if (countryLayers[query].selected === true) {
                        console.log("Wrong Selection?")
                        currentLayer.setStyle(Styles.Selected);
                    } else {
                        currentLayer.setStyle(Styles.Default);
                    }
                }
                currentLayer = null;
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
            //map.fitBounds(currentLayer.getBounds());

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