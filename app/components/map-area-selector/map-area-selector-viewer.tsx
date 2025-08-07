import L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { Rectangle } from "react-leaflet";

function AreaShape({ area }: { area: SelectedArea }) {
  const bounds: L.LatLngBoundsExpression = [
    [area.bounds.south, area.bounds.west],
    [area.bounds.north, area.bounds.east],
  ];

  return <Rectangle bounds={bounds} pathOptions={{ color: "#3b82f6" }} />;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map-marker-icon.png",
  iconUrl: "/map-marker-icon.png",
  shadowUrl: "/map-shadow.png",
});

interface SelectedArea {
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: {
    lat: number;
    lng: number;
  };
  area: number;
}

function calculateArea(latlngs: L.LatLng[]): number {
  if (latlngs.length < 3) return 0;

  let area = 0;
  const earthRadius = 6371000;

  for (let i = 0; i < latlngs.length; i++) {
    const j = (i + 1) % latlngs.length;
    const lat1 = (latlngs[i].lat * Math.PI) / 180;
    const lat2 = (latlngs[j].lat * Math.PI) / 180;
    const lng1 = (latlngs[i].lng * Math.PI) / 180;
    const lng2 = (latlngs[j].lng * Math.PI) / 180;

    area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }

  area = Math.abs((area * earthRadius * earthRadius) / 2);
  return area / 1000000;
}

function DrawControl({
  onAreaSelected,
  onClearArea,
}: {
  onAreaSelected: (area: SelectedArea) => void;
  onClearArea: () => void;
}) {
  const map = useMap();
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    const drawnItems = drawnItemsRef.current;
    map.addLayer(drawnItems);

    const drawControl = new (L.Control as any).Draw({
      position: "topright",
      draw: {
        rectangle: {
          shapeOptions: {
            color: "#3b82f6",
            fillColor: "#3b82f6",
            fillOpacity: 0.2,
            weight: 2,
          },
          showArea: false,
        },
        polygon: {
          shapeOptions: {
            color: "#10b981",
            fillColor: "#10b981",
            fillOpacity: 0.2,
            weight: 2,
          },
          showArea: false,
        },
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    map.addControl(drawControl);

    const onDrawCreated = (e: any) => {
      const layer = e.layer;
      const type = e.layerType;

      drawnItems.clearLayers();
      drawnItems.addLayer(layer);

      const bounds = layer.getBounds();
      const center = bounds.getCenter();

      let area = 0;
      let latlngs: L.LatLng[] = [];

      if (type === "rectangle") {
        // For rectangles, get the corner coordinates
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const nw = L.latLng(ne.lat, sw.lng);
        const se = L.latLng(sw.lat, ne.lng);
        latlngs = [ne, se, sw, nw];
      } else if (type === "polygon") {
        // For polygons, get the actual coordinates
        latlngs = layer.getLatLngs()[0];
      }

      // Calculate area using our custom function
      area = calculateArea(latlngs);

      const selectedArea: SelectedArea = {
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
        center: {
          lat: center.lat,
          lng: center.lng,
        },
        area: Math.round(area * 100) / 100,
      };

      onAreaSelected(selectedArea);
    };

    const onDrawDeleted = () => {
      onClearArea();
    };

    map.on(L.Draw.Event.CREATED, onDrawCreated);
    map.on(L.Draw.Event.DELETED, onDrawDeleted);

    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
      map.off(L.Draw.Event.CREATED, onDrawCreated);
      map.off(L.Draw.Event.DELETED, onDrawDeleted);
    };
  }, [map, onAreaSelected, onClearArea]);

  return null;
}

export default function MapAreaSelectorViewer({ area, mapCentered }: any) {
  console.log("area,mapCentered :>> ", area, mapCentered);
  const [selectedArea, setSelectedArea] = useState<SelectedArea | null>(area);
  const [mapCenter] = useState<[number, number]>(mapCentered); // Mexico City
  const [mapZoom] = useState(10);

  console.log("selectedArea.....111 :>> ", selectedArea, mapCenter);

  const handleAreaSelected = (area: SelectedArea) => {
    setSelectedArea(area);
  };

  const handleClearArea = () => {
    // setSelectedArea(null);
  };

  const copyCoordinates = () => {
    if (selectedArea) {
      const coords = `Norte: ${selectedArea.bounds.north.toFixed(
        6
      )}, Sur: ${selectedArea.bounds.south.toFixed(
        6
      )}, Este: ${selectedArea.bounds.east.toFixed(
        6
      )}, Oeste: ${selectedArea.bounds.west.toFixed(6)}`;
      navigator.clipboard.writeText(coords);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent>
          <div className="relative">
            <div className="h-[500px] w-full rounded-lg overflow-hidden border">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {selectedArea && <AreaShape area={selectedArea} />}
                <DrawControl
                  onAreaSelected={handleAreaSelected}
                  onClearArea={handleClearArea}
                />
              </MapContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      {selectedArea && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Área Seleccionada
              <Badge variant="secondary">{selectedArea.area} km²</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Coordenadas del Área</h4>
                <div className="text-sm space-y-1">
                  <div>Norte: {selectedArea.bounds.north.toFixed(6)}</div>
                  <div>Sur: {selectedArea.bounds.south.toFixed(6)}</div>
                  <div>Este: {selectedArea.bounds.east.toFixed(6)}</div>
                  <div>Oeste: {selectedArea.bounds.west.toFixed(6)}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Centro del Área</h4>
                <div className="text-sm space-y-1">
                  <div>Latitud: {selectedArea.center.lat.toFixed(6)}</div>
                  <div>Longitud: {selectedArea.center.lng.toFixed(6)}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={copyCoordinates} variant="outline" size="sm">
                Copiar Coordenadas
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
