import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dummy group data
const groups = ["Friends", "Work Buddies", "Movie Club"];

// Dummy cafe data
const cafes = [
  { name: "Cafe Mocha", lat: 28.6139, lng: 77.2090 },
  { name: "Starbucks", lat: 28.6145, lng: 77.2020 },
  { name: "Coffee Bean", lat: 28.6150, lng: 77.2150 },
];

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [distances, setDistances] = useState([]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Calculate distances using Haversine formula
  useEffect(() => {
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const distArr = cafes.map((cafe) => ({
      ...cafe,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        cafe.lat,
        cafe.lng
      ).toFixed(2),
    }));

    setDistances(distArr);
  }, [userLocation]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Groups */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Groups</h2>
        <ul className="list-disc list-inside">
          {groups.map((group, index) => (
            <li key={index}>{group}</li>
          ))}
        </ul>
      </div>

      {/* NavLinks */}
      <div className="mb-6">
        <Link
          to="/tmdb"
          className="text-blue-500 hover:underline mr-4"
        >
          TMDB
        </Link>
        <Link
          to="/find-cafe"
          className="text-green-500 hover:underline"
        >
          Find Cafe Near You
        </Link>
      </div>

      {/* Map */}
      <div className="mb-6 h-[400px]">
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
          {cafes.map((cafe, index) => (
            <Marker key={index} position={[cafe.lat, cafe.lng]}>
              <Popup>
                {cafe.name} - {distances[index]?.distance} km away
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Cafe distances */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Nearby Cafes</h2>
        <ul className="list-disc list-inside">
          {distances.map((cafe, index) => (
            <li key={index}>
              {cafe.name} - {cafe.distance} km away
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
