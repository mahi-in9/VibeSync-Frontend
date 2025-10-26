import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const FindCafe = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "80vh",
  };

  const defaultCenter = { lat: 20.5937, lng: 78.9629 };

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
        },
        (error) => {
          console.error("Location error:", error);
          alert("Please enable location access to find nearby places.");
        }
      );
    }
  }, []);

  // Fetch cafés + restaurants when map loads
  const handleMapLoad = (map) => {
    mapRef.current = map;
    if (currentLocation) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: currentLocation,
        radius: 2000, // 2 km radius
        type: ["cafe", "restaurant"],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setCafes(results.slice(0, 5)); // show top 5 only
        } else {
          console.warn("PlacesService Status:", status);
        }
      });
    }
  };

  // Calculate distance in km
  const calculateDistance = (loc1, loc2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.lat)) *
        Math.cos(toRad(loc2.lat)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDkw0BKU6Fh0pMePmTqJEFJJkzLyin-zSM" libraries={["places"]}>
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          ☕ Find Nearby Cafés & Restaurants
        </h2>

        {/* Stage 1: Show list before map */}
        {!showMap && currentLocation && cafes.length > 0 && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-xl font-semibold mb-3 text-center">
              Top 5 Nearby Spots 🍽️
            </h3>
            <ul className="space-y-3">
              {cafes.map((cafe, i) => (
                <li
                  key={i}
                  className="p-3 border rounded-xl hover:bg-gray-50 transition"
                >
                  <h4 className="font-bold">{cafe.name}</h4>
                  <p className="text-gray-600 text-sm">{cafe.vicinity}</p>
                  <p className="text-sm text-blue-600 mt-1">
                    Distance:{" "}
                    {calculateDistance(currentLocation, {
                      lat: cafe.geometry.location.lat(),
                      lng: cafe.geometry.location.lng(),
                    })}{" "}
                    km
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowMap(true)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:scale-105 transition transform"
            >
              View on Map 🗺️
            </button>
          </div>
        )}

        {/* Loading text while fetching location */}
        {!currentLocation && (
          <p className="text-center text-gray-500">Fetching your location...</p>
        )}

        {/* Stage 2: Show Map */}
        {showMap && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={currentLocation || defaultCenter}
            onLoad={handleMapLoad}
          >
            {/* Your Location Marker */}
            {currentLocation && (
              <Marker
                position={currentLocation}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
                title="You are here"
              />
            )}

            {/* Cafes/Restaurants Markers */}
            {cafes.map((cafe, i) => (
              <Marker
                key={i}
                position={{
                  lat: cafe.geometry.location.lat(),
                  lng: cafe.geometry.location.lng(),
                }}
                onClick={() => setSelectedCafe(cafe)}
              />
            ))}

            {/* Info Window */}
            {selectedCafe && (
              <InfoWindow
                position={{
                  lat: selectedCafe.geometry.location.lat(),
                  lng: selectedCafe.geometry.location.lng(),
                }}
                onCloseClick={() => setSelectedCafe(null)}
              >
                <div>
                  <h3 className="font-bold">{selectedCafe.name}</h3>
                  <p>{selectedCafe.vicinity}</p>
                  <p>
                    Distance:{" "}
                    {calculateDistance(currentLocation, {
                      lat: selectedCafe.geometry.location.lat(),
                      lng: selectedCafe.geometry.location.lng(),
                    })}{" "}
                    km
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </LoadScript>
  );
};

export default FindCafe;
