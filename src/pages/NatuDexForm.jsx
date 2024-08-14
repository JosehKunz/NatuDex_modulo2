import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form as BootstrapForm, Button } from 'react-bootstrap';

function NatuDexForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState } = useForm();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (id) {
      async function fetchLocal() {
        const response = await fetch(`http://localhost:3000/localidades/${id}`);
        const data = await response.json();
        setValue('nome', data.nome);
        setValue('descricao', data.descricao);
        setValue('cep', data.cep);
        setValue('localizacao', data.localizacao);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setValue('avaliacao', data.avaliacao);
      }
      fetchLocal();
    }
  }, [id, setValue]);

  async function fetchAddress(cep) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&country=BR&postalcode=${cep}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const address = data[0];
        setValue('localizacao', address.display_name);
        setLatitude(address.lat);
        setLongitude(address.lon);
      } else {
        throw new Error('CEP não encontrado');
      }
    } catch (error) {
      alert('Erro ao buscar endereço');
    }
  }

  async function onSubmit(values) {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/localidades/${id}` : 'http://localhost:3000/localidades';
    const userId = localStorage.getItem('userId');

    const data = {
      ...values,
      userId,
      latitude,
      longitude
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Operação realizada com sucesso");
        navigate('/dashboard');
      } else {
        alert("Houve um erro ao realizar a operação");
      }
    } catch (error) {
      alert("Houve um erro ao realizar a operação - NO CATCH");
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center mt-3 mb-3">{id ? 'Editar Local' : 'Cadastrar Novo Local'}</h1>
          <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
            <BootstrapForm.Group controlId="formNome" className="mb-3">
              <BootstrapForm.Label>Nome</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="Nome"
                {...register('nome', { required: 'O nome é obrigatório' })}
              />
              {formState.errors?.nome && <p className="text-danger">{formState.errors.nome.message}</p>}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formDescricao" className="mb-3">
              <BootstrapForm.Label>Descrição</BootstrapForm.Label>
              <BootstrapForm.Control
                as="textarea"
                placeholder="Descrição"
                {...register('descricao', { required: 'A descrição é obrigatória' })}
              />
              {formState.errors?.descricao && <p className="text-danger">{formState.errors.descricao.message}</p>}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formCEP" className="mb-3">
              <BootstrapForm.Label>CEP</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="CEP"
                {...register('cep')}
                onBlur={(e) => fetchAddress(e.target.value)}
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formLocalizacao" className="mb-3">
              <BootstrapForm.Label>Localização</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="Localização"
                {...register('localizacao')}
                readOnly
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formLatitude" className="mb-3">
              <BootstrapForm.Label>Latitude</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="Latitude"
                value={latitude}
                readOnly
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formLongitude" className="mb-3">
              <BootstrapForm.Label>Longitude</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="Longitude"
                value={longitude}
                readOnly
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formAvaliacao" className="mb-3">
              <BootstrapForm.Label>Avaliação</BootstrapForm.Label>
              <BootstrapForm.Control
                as="select"
                {...register('avaliacao', { required: 'A avaliação é obrigatória' })}
              >
                <option value="">Selecione a avaliação</option>
                <option value="1">1 - Muito Ruim</option>
                <option value="2">2 - Ruim</option>
                <option value="3">3 - Médio</option>
                <option value="4">4 - Bom</option>
                <option value="5">5 - Excelente</option>
              </BootstrapForm.Control>
              {formState.errors?.avaliacao && <p className="text-danger">{formState.errors.avaliacao.message}</p>}
            </BootstrapForm.Group>

            <Button variant="primary" type="submit" className="btn-spacing">
              {id ? 'Salvar' : 'Cadastrar'}
            </Button>
          </BootstrapForm>
        </Col>
      </Row>
    </Container>
  );
}

export default NatuDexForm;
