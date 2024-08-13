import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';

function Dashboard() {
  const [totalLocais, setTotalLocais] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const locaisResposta = await fetch('http://localhost:3000/localidades');
      const locaisData = await locaisResposta.json();
      setTotalLocais(locaisData.length);
      setLocais(locaisData);

      const usuariosResposta = await fetch('http://localhost:3000/usuarios');
      const usuariosData = await usuariosResposta.json();
      setTotalUsuarios(usuariosData.length);
    }

    carregarDados();
  }, []);

  return (
    <Container>
      <h1 className="text-right mt-4 mb-4">Dashboard</h1>
      <Row className="justify-content-md-right mb-3">
        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Title><img src="/pin.png" alt="Icone Usuários" className = "icon"/> Total de Locais</Card.Title>
              <Card.Text className="card-text">{totalLocais}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Title> <img src="/pessoas.png" alt="Icone Usuários" className = "icon"/> Total de Usuários Ativos</Card.Title>
              <Card.Text className="card-text">{totalUsuarios}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr className="my-4" />

      <h4 className="text-right mt-4 mb-4">Confira os locais de preservação cadastrados!</h4>

      <Row>
        {locais.map(local => (
          <Col md="6" className="mb-3" key={local.id}>
            <Card>
              <Card.Body>
                <Card.Title>{local.nome}</Card.Title>
                <Card.Text className="small-text" >Nota do Usuário: {local.avaliacao} </Card.Text>
                <Card.Text className="text" >{local.descricao}</Card.Text>
                <Card.Text className="small-text">{local.localizacao}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
