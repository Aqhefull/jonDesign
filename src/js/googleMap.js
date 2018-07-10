function initMap() {
  const uluru = { lat: 50.448390, lng: 30.513023 };
  if (document.getElementById('map') != null) {
    setTimeout(() => {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: uluru,
        styles: [
          {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [
              {
                color: "#f7f1df"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#d0e3b4"
              }
            ]
          },
          {
            featureType: "landscape.natural.terrain",
            elementType: "geometry",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi.business",
            elementType: "all",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi.medical",
            elementType: "geometry",
            stylers: [
              {
                color: "#fbd3da"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#bde6ab"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffe15f"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#efd151"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "black"
              }
            ]
          },
          {
            featureType: "transit.station.airport",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#cfb2db"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#a2daf2"
              }
            ]
          }
        ]
      });
      const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }, 1000);
  }
  if (document.getElementById("miniMap") != null) {
    setTimeout(() => {
      const miniMap = new google.maps.Map(document.getElementById("miniMap"), {
        zoom: 15,
        center: uluru,
        styles: [
          {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [
              {
                color: "#f7f1df"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#d0e3b4"
              }
            ]
          },
          {
            featureType: "landscape.natural.terrain",
            elementType: "geometry",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi.business",
            elementType: "all",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi.medical",
            elementType: "geometry",
            stylers: [
              {
                color: "#fbd3da"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#bde6ab"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffe15f"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#efd151"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "black"
              }
            ]
          },
          {
            featureType: "transit.station.airport",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#cfb2db"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#a2daf2"
              }
            ]
          }
        ]
      });
      const miniMapMarker = new google.maps.Marker({
        position: uluru,
        map: miniMap
      });
    }, 1000);
    
  }
}