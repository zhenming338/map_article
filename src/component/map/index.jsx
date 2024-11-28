import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Map = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const MAPBOX_TOKEN = "pk.eyJ1Ijoicml2ZXI3NzYiLCJhIjoiY20zZzBsYXg1MDFmdTJqcHZ4dGhqejZ6MSJ9.qCT1iwtrcDQNw4FoZWPf_g";
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const storeMapState = useSelector((state) => state.map.currentState);
    const storeAnimations = useSelector(state => state.map.animations)
    // const data = [
    //     { location: [121.473701, 31.230416], population: 414500 },
    //     { location: [116.394653, 39.909808], population: 5000000 },
    //     { location: [116.384653, 39.899808], population: 3000000 },
    // ];

    let currentIndex = 0;

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [117, 40],
            zoom: 10,
        });

        mapInstanceRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");

        mapInstanceRef.current.on("load", () => {
            setIsMapLoaded(true)
        });

        return () => {
            mapInstanceRef.current?.remove();
        };
    }, []);

    const addPopulationLayer = (item) => {
        const height = item.population / 100;
        const polygon = [
            [item.location[0] - 0.01, item.location[1] - 0.01],
            [item.location[0] + 0.01, item.location[1] - 0.01],
            [item.location[0] + 0.01, item.location[1] + 0.01],
            [item.location[0] - 0.01, item.location[1] + 0.01],
            [item.location[0] - 0.01, item.location[1] - 0.01],
        ];

        // 如果 Source 已存在，先移除
        if (mapInstanceRef.current.getSource(`population${storeMapState.animationsIndex}${currentIndex}`)) {
            mapInstanceRef.current.removeLayer(`population${storeMapState.animationsIndex}${currentIndex}`);
            mapInstanceRef.current.removeSource(`population${storeMapState.animationsIndex}${currentIndex}`);
        }

        mapInstanceRef.current.addSource(`population${storeMapState.animationsIndex}${currentIndex}`, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {
                            population: item.population,
                            height,
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: [polygon],
                        },
                    },
                ],
            },
        });

        mapInstanceRef.current.addLayer({
            id: `population${storeMapState.animationsIndex}${currentIndex}`,
            type: "fill-extrusion",
            source: `population${storeMapState.animationsIndex}${currentIndex}`,
            paint: {
                "fill-extrusion-color": [
                    "interpolate",
                    ["linear"],
                    ["get", "population"],
                    0,
                    "#008000",
                    5000,
                    "#FF0000",
                ],
                "fill-extrusion-height": ["get", "height"],
                "fill-extrusion-opacity": 0.7,
            },
        });

        // mapInstanceRef.current.flyTo({
        //     center: item.location,
        //     zoom: 12,
        //     speed: 1.2,
        // });

        mapInstanceRef.current.flyTo({
            center: storeAnimations[storeMapState.animationsIndex].mapState.center,
            zoom: storeAnimations[storeMapState.animationsIndex].mapState.zoom,
            pitch: storeAnimations[storeMapState.animationsIndex].mapState.pitch,
            speed: 1.2,
            curve: 1.43,
            essential: true,
        });

        currentIndex++;
    };

    const updatePopulationData = (data) => {
        if (currentIndex >= data.length) {
            return;
        }
        addPopulationLayer(data[currentIndex]);
        setTimeout(updatePopulationData(data), 1000); // 每秒添加一个柱状图
    };




    useEffect(() => {

        // mapInstanceRef.current.on("load", () => {

        console.log("地图样式加载完成")
        if (mapInstanceRef.current && storeMapState && isMapLoaded) {

            //将原有的直接跳转改为动画组控制
            if (storeMapState.animationsIndex == 0) {
                console.log(storeAnimations[storeMapState.animationsIndex].populationBars)
                let currentIndex = 0;
                updatePopulationData(storeAnimations[storeMapState.animationsIndex].populationBars)
            } else {
                mapInstanceRef.current.flyTo({
                    center: storeMapState.center,
                    zoom: storeMapState.zoom,
                    pitch: storeMapState.pitch,
                    speed: 1.2,
                    curve: 1.43,
                    essential: true,
                });
            }
        }
        // })

    }, [storeMapState, isMapLoaded]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                width: "60vw",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: "0",
            }}
            className={classNames("map-item-container")}
        ></div>
    );
};

export default Map;
