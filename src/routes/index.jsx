import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Form from '../pages/Form'
import Login from '../pages/login'
import Dashboard from '../pages/Dashboard'
import NatuDexForm from '../pages/NatuDexForm'
import NatuDexList from '../pages/NatuDexList'
import { TemplatePrivado } from './TemplatePrivado'


function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<TemplatePrivado />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/natudex-form' element={<NatuDexForm />} />
          <Route path='/natudex-list' element={<NatuDexList />} />
        </Route>
        <Route path='/form' element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp
