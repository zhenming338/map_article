import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const Map = () => {

    const mapContainerRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const MAPBOX_TOKEN = "pk.eyJ1Ijoicml2ZXI3NzYiLCJhIjoiY20zZzBsYXg1MDFmdTJqcHZ4dGhqejZ6MSJ9.qCT1iwtrcDQNw4FoZWPf_g"
    const storeMapState = useSelector(state => state.map.currentState);
    useEffect(() => {
        // console.log(storeMapState)
        mapboxgl.accessToken = MAPBOX_TOKEN;
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [116, 40],
            zoom: 10
        })
        mapInstanceRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");
        return () => {
            mapInstanceRef.current?.remove()
        }
    }, [])

    useEffect(() => {
        if (mapInstanceRef.current) {
            console.log(storeMapState)
            mapInstanceRef.current.flyTo({
                center: storeMapState.center,
                zoom: storeMapState.zoom,
                pitch: storeMapState.pitch,
                speed: 1.2,
                curve: 1.43,
                essential: true
            })
        }
    }, [storeMapState])
    const handleFlyTo = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo({
                center: [121.4737, 31.2304],
                zoom: 12,
                speed: 1.2,
            });
        }
    };
    return <div
        ref={mapContainerRef}
        style={{
            width: "60vw",
            height: "100vh",

            position: "fixed",
            top: "0",
            left: "0"
        }}
        className={classNames("map-item-container")} >
    </div>
}
export default Map