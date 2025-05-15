export function Dropdown(geojson, selectElement){
    document.getElementById('selectedCountries').addEventListener('change', function () {
        const selectedName = this.value;
    
        geojson.eachLayer(layer => {
            if (layer.selected) {
                if (layer.feature.properties.NAME_ENGL === selectedName) {
                    // Highlight the one from the dropdown
                    layer.setStyle(Styles.Highlighted);
                    layer.isDropdownHighlighted = true;
                } else if (layer.isDropdownHighlighted) {
                    // Reset previous highlight
                    layer.setStyle(Styles.Selected);
                    layer.isDropdownHighlighted = false;
                }
            }
        });
    });
}