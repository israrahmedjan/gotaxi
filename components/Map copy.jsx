"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox access token here
mapboxgl.accessToken =
  "pk.eyJ1IjoidWxhZGJvaGRhbiIsImEiOiJjam9kMDQ1NzYxOTYyM3FvanhpOXE1cDIzIn0.JiXb8lR9e53GqZz51PZdaQ";

const Map = () => {
  const mapContainer = useRef(null);

  const map = useRef(null);
  const marker = useRef(null);
  const lng = -74.5;
  const lat = 40;
  const zoom = 9;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [lng, lat],
      zoom: zoom,
    });

    // Add a marker to the map
    marker.current = new mapboxgl.Marker()
      .setLngLat([lng, lat]) // Marker coordinates
      .addTo(map.current); // Add marker to map
  }, []);
  //console.log("Conatiner", mapContainer.current);
  return <div ref={mapContainer} style={{ width: "50%", height: "250px" }} />;
};

export default Map;
