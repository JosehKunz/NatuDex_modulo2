import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ latitude, longitude, locais }) {
  const position = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "200px", width: "100%" }}>
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
