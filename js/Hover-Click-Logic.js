// Counter to track number of polygons chosen
let clicked = null;

export function hoverclick(layer) {
    layer.on({
        mouseover: function (e) {
            e.target.setStyle(Styles.Highlighted);
        },
        mouseout: function (e) {
            if (!e.target.selected) {
                console.log("Mouseout over not selected")
                e.target.setStyle(Styles.Default);
            } else if (layer.isDropdownHighlighted === true) {
                e.target.setStyle(Styles.Highlighted); 
            } else {
                console.log("Mouseout over selected")
                e.target.setStyle(Styles.Selected); 
            }
        },
        click: function (e) {
            clicked = e.target;

            let countryName = clicked.feature.properties.NAME_ENGL;
            const dropdown = document.getElementById('selectedCountries');

            if (!clicked.selected) {
                clicked.selected = true;
                clicked.setStyle(Styles.Selected);
                console.log('Selected Country:', countryName);

                 // Add option
                const option = document.createElement("option");
                option.text = countryName;
                option.value = countryName;
                dropdown.insertBefore(option, dropdown.firstChild);

                 // Select the newly inserted option
                dropdown.selectedIndex = 0;
                area(e.target,1)

            } else {
                clicked.selected = false;
                clicked.setStyle(Styles.Default);
                console.log('Deselected Country:', countryName);

                // Remove from dropdown
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].value === countryName) {
                        dropdown.remove(i);
                        break;
                    }
                }

                area(e.target,0)

            }

            let selectedCount = dropdown.options.length;
            // Update the counter display
            document.getElementById('selectedCount').innerText =
                `Travelled Countries: ${selectedCount}`;

            // Update the counter display
            document.getElementById('area').innerText =
            `Area Combined: ${flaeche} 1000*km2`;
        }
    });
}