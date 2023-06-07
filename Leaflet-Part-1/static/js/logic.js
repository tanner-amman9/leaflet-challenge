function getColor(d) {
    if (d >= 90) {
        color = "#FF0000";
    }
    else if (d < 90 && d >= 70) {
        color = "#FF3300";
    }
    else if (d < 70 && d >= 50) {
        color = "#ff9900";
    }
    else if (d < 50 && d >= 30) {
        color = "#FFFF00";
    }
    else if (d < 30 && d >= 10) {
        color = "#99ff00";
    }
    else if (d < 10 && d >= -10) {
        color = "#00ff00";
    };

    return color;
}



var myMap = L.map("map", {
    center: [40.73, -104.0059],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [-10, 10, 30, 50, 70, 90]
        
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


function getRadius(mag) {
    if (mag == 0) {
        return 1;
    }
    return 10000 * mag;
}




var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
d3.json(url).then(data => {

    var quakes = data.features;
    for (var index = 0; index<quakes.length; index++) {
        var quake = quakes[index];
        L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
            color: '#000000',
            fillColor: getColor(quake.geometry.coordinates[2]),
            weight: 1,
            opacity: .8,
            radius: getRadius(quake.properties.mag)
        }).bindPopup(`<h3>${quake.properties.place}</h3><br/>Magnitude: ${quake.properties.mag}<br/>Depth: ${quake.geometry.coordinates[2]}`).addTo(myMap);
            
    };

});
