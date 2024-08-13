import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form as BootstrapForm, Button, Container, Row, Col } from 'react-bootstrap';

function Form() {
  const { register, handleSubmit, formState, setValue } = useForm();
  const [cpfError, setCpfError] = useState('');
  const navigate = useNavigate();

  async function fetchAddress(cep) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&country=BR&postalcode=${cep}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const address = data[0];
        setValue('endereco', address.display_name);
        setValue('latitude', address.lat);
        setValue('longitude', address.lon);
      } else {
        throw new Error('CEP não encontrado');
      }
    } catch (error) {
      alert('Erro ao buscar endereço');
    }
  }

  async function addUser(values) {
    const existingUsersResponse = await fetch('http://localhost:3000/usuarios');
    const existingUsers = await existingUsersResponse.json();

    const cpfExists = existingUsers.some(user => user.cpf === values.cpf);
    if (cpfExists) {
      setCpfError('CPF já cadastrado.');
      return;
    }

    setCpfError('');

    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          id: Math.random().toString(36).substr(2, 9)
        })
      });

      if (response.ok) {
        alert("Cadastrado com sucesso");
        navigate('/dashboard');
      } else {
        alert("Houve um erro ao cadastrar o usuário");
      }
    } catch (error) {
      alert("Houve um erro ao cadastrar o usuário - NO CATCH");
    }
  }

  return (
    <Container>
  <Row className="justify-content-md-center" >
    <Col md="6">
        <h1 className="text-center mt-4 mb-4">Faça seu cadastro aqui</h1>
          <BootstrapForm onSubmit={handleSubmit(addUser)}>
            <BootstrapForm.Group controlId="formNome" className="mb-3">
              <BootstrapForm.Label>Nome</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="Nome"
                {...register('nome', { required: 'O nome é obrigatório' })}
              />
              {formState.errors?.nome && <p className="text-danger">{formState.errors.nome.message}</p>}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formSexo" className="mb-3">
              <BootstrapForm.Label>Sexo</BootstrapForm.Label>
              <BootstrapForm.Control as="select" {...register('sexo', { required: 'O sexo é obrigatório' })}>
                <option value="">Selecione o sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </BootstrapForm.Control>
              {formState.errors?.sexo && <p className="text-danger">{formState.errors.sexo.message}</p>}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formCPF" className="mb-3">
              <BootstrapForm.Label>CPF</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="CPF"
                {...register('cpf', { required: 'O CPF é obrigatório' })}
              />
              {formState.errors?.cpf && <p className="text-danger">{formState.errors.cpf.message}</p>}
              {cpfError && <p className="text-danger">{cpfError}</p>}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formDataNascimento" className="mb-3">
              <BootstrapForm.Label>Data de Nascimento</BootstrapForm.Label>
              <BootstrapForm.Control
                type="date"
                {...register('dataNascimento', { required: 'A data de nascimento é obrigatória' })}
              />
              {formState.errors?.dataNascimento && <p className="text-danger">{formState.errors.dataNascimento.message}</p>}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formEmail" className="mb-3">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <BootstrapForm.Control
                type="email"
                placeholder="Email"
                {...register('email', { required: 'O email é obrigatório' })}
              />
              {formState.errors?.email && <p className="text-danger">{formState.errors.email.message}</p>}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formSenha" className="mb-3">
              <BootstrapForm.Label>Senha</BootstrapForm.Label>
              <BootstrapForm.Control
                type="password"
                placeholder="Senha"
                {...register('senha', { required: 'A senha é obrigatória' })}
              />
              {formState.errors?.senha && <p className="text-danger">{formState.errors.senha.message}</p>}
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

            <BootstrapForm.Group controlId="formEndereco" className="mb-3">
              <BootstrapForm.Label>Endereço</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="Endereço"
                {...register('endereco')}
                readOnly
              />
            </BootstrapForm.Group>

            <Button variant="primary" type="submit" className="btn-spacing">
              Cadastrar
            </Button>
          </BootstrapForm>
        </Col>
      </Row>
    </Container>
  );
}

export default Form;
