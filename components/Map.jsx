"use client";
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf"; // Import Turf.js

// Set your Mapbox access token here
mapboxgl.accessToken =
  "pk.eyJ1IjoidWxhZGJvaGRhbiIsImEiOiJjam9kMDQ1NzYxOTYyM3FvanhpOXE1cDIzIn0.JiXb8lR9e53GqZz51PZdaQ";

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("mapContainer");

    if (mapContainer) {
      const map = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40],
        zoom: 9,
      });

      // Coordinates for the markers
      const marker1Coordinates = [-74.5, 40];
      const marker2Coordinates = [-74.52, 40.08];

      // First marker with popup
      const marker1 = new mapboxgl.Marker({ color: "red" })
        .setLngLat(marker1Coordinates)
        .addTo(map);

      const popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
        "New Jersey, USA"
      );
      marker1.setPopup(popup1);

      // Second marker with popup, positioned nearby
      const marker2 = new mapboxgl.Marker({ color: "green" })
        .setLngLat(marker2Coordinates)
        .addTo(map);

      const popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
        "Another Location"
      );
      marker2.setPopup(popup2);

      // Calculate the distance between the two markers
      const from = turf.point(marker1Coordinates);
      const to = turf.point(marker2Coordinates);
      const distance = turf.distance(from, to, { units: "kilometers" });

    //  console.log(`Distance between the markers: ${distance.toFixed(2)} km`);
    }
  }, []);

  return <div id="mapContainer" style={{ width: "50%", height: "250px" }} />;
};

export default Map;
