import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import RegisterEvent from './pages/RegisterEvent/RegisterEvent'
import EventsPage from './pages/EventsPage/EventsPage'
import { Toaster } from 'sonner';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />} />
      <Route path='/registro' element={<RegisterEvent />} />
      <Route path='/lista' element={<EventsPage />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}








export default App
