import { Outlet, Navigate } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import '../components/SideMenu.css'
import './TemplatePrivado.css'

export function TemplatePrivado() {
  const estaAutenticado = localStorage.getItem("autenticado")

  return estaAutenticado === "true" ? (
    <div className="app-container">
      <SideMenu />
      <div className="main-content">
        <nav className="navbar navbar-light ">
          <div className="container-fluid">
          <img src="/logo-grande.png" alt="Logo" className="img-logo" />
          <button className='btn btn-dark' onClick={() => {
              localStorage.removeItem('autenticado')
              localStorage.removeItem('userId')
              window.location.href = '/'
            }}>
              Sair
            </button>
          </div>
        </nav>
        <main className='container mt-4'>
          <Outlet />
        </main>
      </div>
    </div>
  ) : <Navigate to="/" />
}
