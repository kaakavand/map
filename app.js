let map;
let circleMarker;

function onGeolocationSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  if (!map) {
    map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    circleMarker = L.circleMarker([latitude, longitude], {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.4,
      radius: 10,
      weight: 3,
    })
      .addTo(map)
      .bindPopup("You are here!")
      .openPopup();
  } else {
    circleMarker.setLatLng([latitude, longitude]);

    circleMarker.setPopupContent(`Accuracy: ${Number(accuracy).toFixed(1)} meters`);
  }
}

function onGeolocationError(error) {
  console.error("Geolocation error:", error);
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    onGeolocationSuccess,
    onGeolocationError,
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    }
  );
} else {
  alert("Geolocation is not supported by this browser.");
}
