import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';

function NatuDexList() {
  const navigate = useNavigate();
  const [locais, setLocais] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const userId = localStorage.getItem('userId');

  async function carregarLocais() {
    const resposta = await fetch(`http://localhost:3000/localidades?userId=${userId}`);
    const data = await resposta.json();
    setLocais(data);
  }

  useEffect(() => {
    carregarLocais();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/localidades/${id}`, {
        method: 'DELETE'
      });
      carregarLocais();
    } catch (error) {
      console.error('Erro ao deletar a localidade:', error);
    }
    setShowDeleteModal(false);
  }

  const handleEdit = (local) => {
    setSelectedLocal(local);
    setShowEditModal(true);
  }

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedLocal = {
      ...selectedLocal,
      nome: form.nome.value,
      descricao: form.descricao.value,
      localizacao: form.localizacao.value,
      latitude: form.latitude.value,
      longitude: form.longitude.value
    };

    try {
      await fetch(`http://localhost:3000/localidades/${selectedLocal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedLocal)
      });
      carregarLocais();
    } catch (error) {
      console.error('Erro ao editar a localidade:', error);
    }
    setShowEditModal(false);
  }

  return (
    <Container>
      <Button variant="success" onClick={() => navigate('/natudex-form')} className="mt-3 mb-3">Cadastrar Nova Área</Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Localização</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {locais.map((local) => (
            <tr key={local.id}>
              <td>{local.nome}</td>
              <td>{local.descricao}</td>
              <td>{local.localizacao}</td>
              <td>{local.latitude}</td>
              <td>{local.longitude}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(local)} className="me-2 btn-spacing">Editar</Button>
                <Button variant="danger" onClick={() => {
                  setSelectedLocal(local);
                  setShowDeleteModal(true);
                }} className="btn-spacing">Deletar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de Confirmação de Deleção */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Deleção</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja deletar esta localidade?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedLocal.id)}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edição */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Localidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEdit}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" defaultValue={selectedLocal?.nome} name="nome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" defaultValue={selectedLocal?.descricao} name="descricao" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocalizacao">
              <Form.Label>Localização</Form.Label>
              <Form.Control type="text" defaultValue={selectedLocal?.localizacao} name="localizacao" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control type="text" defaultValue={selectedLocal?.latitude} name="latitude" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control type="text" defaultValue={selectedLocal?.longitude} name="longitude" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default NatuDexList;
