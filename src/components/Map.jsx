import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ locais }) {
  const position = [-27.5953777, -48.5480499];

  return (
    <MapContainer center={position} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locais.map(local => (
        <Marker key={local.id} position={[local.latitude, local.longitude]}>
          <Popup>
            {local.nome}<br />
            {local.descricao}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
