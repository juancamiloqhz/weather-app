import { useState, useEffect } from "react";

interface LocationData {
  latitude: string;
  longitude: string;
  errorMessage?: string;
}

export const useLocation = () => {
  const [coords, setCoords] = useState<LocationData>({
    latitude: "",
    longitude: "",
    errorMessage: ""
  });

  // Get the current position of the user after the component was mounted, otherwise we have undefined the first time
  useEffect(() => {
    getCoords();
  }, []);
  function getCoords() {
    let locationData: LocationData = { latitude: "", longitude: "" };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        location => {
          locationData.latitude = location.coords.latitude.toString();
          locationData.longitude = location.coords.longitude.toString();
          localStorage.setItem("latitude", locationData.latitude);
          localStorage.setItem("longitude", locationData.longitude);
          setCoords(d => ({
            ...d,
            latitude: locationData.latitude,
            longitude: locationData.longitude
          }));
        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              locationData.errorMessage =
                "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              locationData.errorMessage =
                "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              locationData.errorMessage =
                "The request to get user location timed out.";
              break;
          }
          setCoords(d => ({ ...d, errorMessage: locationData.errorMessage }));
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 1000 }
      );
    } else {
      setCoords(d => ({
        ...d,
        errorMessage: "Geolocation is not supported by this browser."
      }));
    }
  }

  return coords;
};
