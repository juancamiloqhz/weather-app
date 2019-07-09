import { useState } from "react";

interface LocationData {
    latitude?: string;
    longitude?: string;
    forecast?: string;
}

export const useLocation = () => {
    const [coords] = useState<LocationData>(() => getCoords())

    // Get the current position of the user
    function getCoords() {
        let locationData: LocationData = {};
        navigator.geolocation.getCurrentPosition(
            (location) => {
                locationData.latitude = location.coords.latitude.toString();
                locationData.longitude = location.coords.longitude.toString();
                localStorage.setItem("latitude", locationData.latitude)
                localStorage.setItem("longitude", locationData.longitude)
            },
            (error) => { locationData.forecast = error.message },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        )
        return locationData
    }

    return coords
}