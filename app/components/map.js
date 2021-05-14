import React, { useEffect } from 'react';
import PropTypes from 'prop-types'


import { useRouter } from 'next/router'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

// ---------------------------------------------------------------------------------
// API key for premium light mode map. Leave null if using free option. Get API key here:  https://www.mapbox.com
const mapboxKey = null;
// ---------------------------------------------------------------------------------

function Map(props){
    const router = useRouter()

    useEffect(
        ()=>{
            let basemap;

            if (mapboxKey) {
                // High quality map
                basemap = L.tileLayer(
                    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                    {
                        accessToken: mapboxKey,
                        id: 'mapbox/light-v10',
                        tileSize: 512,
                        zoomOffset: -1,
                        attribution: '© <a href="https://www.newMapbox.com/about/newMaps/">Mapbox</a> © <a href="http://www.openstreetnewMap.org/copyright">OpenStreetMap</a>',
                    }
                );
            }
            else {
                // Free map
                basemap = L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
                    {
                        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }
                );
            };          
                                    
            const newMap = L.map('map', {
                center: [38.4,24.5],
                zoom: 5,
                layers: [basemap]
            });

            fetch('entries.geojson',{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function(response){
                return response.json();
            })
            .then(function(geojson) {
                let entries = L.geoJSON(geojson, {
                    pointToLayer: function(feature, latlng) {
                        var smallIcon = new L.Icon({
                            iconSize: [30, 30],
                            iconAnchor: [15, 30],
                            popupAnchor:  [0, -35],
                            iconUrl: 'map-pin.svg'
                        });
                        return L.marker(latlng, {icon: smallIcon});
                    },
                    onEachFeature: (feature, layer)=>{
                        layer.on('click', function () {
                            router.push(`/v/${feature.id}`)
                            props.onEntryClick(feature);
                        });
                        if (feature.properties && feature.properties.description) {
                            // layer.bindTooltip(`<a href="/v/${feature.id}" target="_blank">${feature.properties.description}</a>`, {interactive: true});
                            layer.bindTooltip(feature.properties.description, {offset: [20, 0], opacity: 1});
                        }
                    }
                })
                let clusteredEntries = L.markerClusterGroup();
                clusteredEntries.addLayer(entries);
                return clusteredEntries
            })
            .then((clusteredEntries)=>{
                newMap.whenReady(() => {
                    newMap.fitBounds(clusteredEntries.getBounds());
                    newMap.addLayer(clusteredEntries);
                });
            })
            .catch((error)=>{
                console.log('Error while fetching Events geojson', error)
            });

            newMap.whenReady(() => {
                props.onMapReady(newMap)
            });

            return ()=>{
                newMap.remove();
            }
        },
        []
    );

    return <div id='map' style={props.containerStyle}></div>
};

Map.propTypes = {
    containerStyle: PropTypes.object,
    onMapReady: PropTypes.func,
    onEntryClick: PropTypes.func,
};
Map.defaultProps = {
    containerStyle: {width: 500, height: 350},
    onMapReady: ()=>{}, // Runs function when Leaflet map object is responsive. Accepts map object.
    onEntryClick: ()=>{}, // Runs when entry markers are clicked.
};

export default Map;