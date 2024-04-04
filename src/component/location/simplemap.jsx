import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useGoogleMap } from '@react-google-maps/api';
import GoogleMapLayout from '../../common/layout/GoogleMapLayout';

const center = {
  lat: 40.7128, // Example latitude
  lng: -74.0060, // Example longitude
};

// Component to handle the creation of AdvancedMarker
const AdvancedMarker = ({ position }) => {
  const map = useGoogleMap();

  useEffect(() => {
    if (!map) return;

    // Corrected the marker initialization
    const marker = new window.google.maps.Marker({
      position,
      map,
      // Add additional properties for the marker here
    });

    return () => marker.setMap(null); // Cleanup on component unmount
  }, [map, position]);

  return null; // This component does not render anything itself
};

const SimpleMap = ({ mapContainerStyle, googleMapsApiKey, lat, lng }) => {
  const [position, setPosition] = useState({ lat, lng });

  // Update position state whenever lat or lng props change
  useEffect(() => {
    setPosition({ lat, lng });
  }, [lat, lng]);

  return (
    // <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
      <GoogleMapLayout>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10} // You can adjust the zoom level here
        >
          {/* AdvancedMarker is now a child of GoogleMap */}
          <AdvancedMarker position={center} />
        </GoogleMap>
      </GoogleMapLayout>
    // </LoadScriptNext>
  );
};

export default SimpleMap;
