window.Selected = function(countryLayers, currentLayer, countryName, dropdown){
    let currentName = currentLayer.feature.properties.NAME_ENGL;

    currentLayer.setStyle(Styles.Selected);

    const option = document.createElement("option");
    option.text = currentName;

    if (!countryLayers[countryName].selected) {
        area(countryLayers[countryName],1)

        dropdown.insertBefore(option, dropdown.firstChild);

        dropdown.selectedIndex = 0;

    }
    
    let selectedCount = dropdown.options.length;
    // Update the counter display
    document.getElementById('selectedCount').innerText =
    `Travelled Countries: ${selectedCount}`;
}