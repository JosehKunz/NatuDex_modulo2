import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import '../styles.css'

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const senha = event.target.senha.value

    if (!email || !senha) {
      setError('Email e Senha são obrigatórios.')
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios?email=${email}&senha=${senha}`)
      const data = await response.json()

      if (data.length > 0) {
        localStorage.setItem('autenticado', 'true')
        localStorage.setItem('userId', data[0].id)
        navigate('/dashboard')
      } else {
        setError('Email ou senha inválidos.')
      }
    } catch (error) {
      setError('Erro ao tentar realizar login. Tente novamente.')
    }
  }

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="4">
            <div className="login-form">
              <div className="logo-container">
                <img src="/logo-grande.png" alt="Logo" />
              </div>
              <h1 className="text-center">Seja muito bem-vindo(a)!</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" placeholder="Digite seu e-mail" name="email" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Digite sua senha" name="senha" />
                </Form.Group>
                <Button variant="secondary btn-sm" type="submit" className="mt-3">
                  Logar
                </Button>
              </Form>
              {error && <p className="text-danger mt-3">{error}</p>}
              <Link to="/form" className="d-block mt-3">
                <Button variant="light btn-sm" >Cadastrar</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
