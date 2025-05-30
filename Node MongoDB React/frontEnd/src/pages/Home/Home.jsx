import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import myComIcon from '../../assets/img/myComIcon.svg'
import myComImage from '../../assets/img/myComImage.svg'
import axios from 'axios'

const Home = () => {
  const [outstandingEvents, setOutStandingEvents] = useState([])


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/registros')
        const filteredEvents = response.data.filter(event => event.outstanding)
        setOutStandingEvents(filteredEvents)
      } catch (err) {
        console.error('Error al obtener los datos del servidor')
      }

    }


    fetchEvents()
  },[])

  console.log("eventos destacados", outstandingEvents)


  return (
    <div className="container mx-auto py-10">
      <header className="mb-10 text-center">
        <img className='mx-auto h-[75px]' src={myComIcon} alt="mi comunidad" />
        <h1 className="text-4xl font-bold tracking-tight">Eventos Comunitarios</h1>
        <p className="mt-2 text-base text-muted-foreground">Descubre y participa en eventos de tu comunidad</p>
        <div className="mt-6">
          <Link to="/registro">
            <Button size="lg">Registrar Nuevo Evento</Button>
          </Link>
        </div>
      </header>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Próximos Eventos</h2>
          <Link to="/lista">
            <Button variant="outline">Ver Todos</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outstandingEvents.map((data,i) => (
            <div key={i} className="block group">
              <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
                <div className="relative h-48 w-full bg-muted">
                  <img
                    src={myComImage}
                    alt={`Evento ${i}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Destacado
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {data.name}
                  </h3>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{data.dateForm}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      <span>{data.location}</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="mr-2 h-4 w-4" />
                      <span>Organizado por: {data.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home