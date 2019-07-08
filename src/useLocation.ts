import { useState, useEffect } from "react";

export const useLocation = () => {
    const [coords, setCoords] = useState({ latitude: '', longitude: '', forecast: '' })
    // Get the current position of the user
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { longitude, latitude } }) => {
                localStorage.setItem("latitude", latitude.toString())
                localStorage.setItem("longitude", longitude.toString())
                setCoords((prev) => ({ ...prev, longitude: longitude.toString(), latitude: latitude.toString() }))
            },
            (error) => setCoords(prev => ({ ...prev, forecast: error.message })),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }, [])

    return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        forecast: coords.forecast
    }
}