import React, { useState } from 'react'
import { CalendarIcon, MapPinIcon, PlusIcon, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import myComImage from '../../assets/img/myComImage.svg'
import { useEffect } from "react"
import axios from 'axios'





const EventsPage = () => {
  const [events, setEvents] = useState([])

  useEffect(()=> {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:3000/registros')
      setEvents(response.data)
    }

    fetchEvents()
  }, [])

  console.log('eventos', events)


  const filteredEvents = events.filter(event => event.outstanding);

  return (
    <div className="container mx-auto py-10">
      <div className='flex justify-start items-center gap-2'>
        <Link to={'/'} className='bg-green-300 px-2 py-1 rounded-md'>
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
        </Link>
        <p className='font-light'>Volver Inicio</p>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Listado de Eventos</h1>
        <Link to="/registro">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Nuevo Evento
          </Button>
        </Link>
      </div>

     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((data, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="relative h-48 w-full bg-muted">
              <img
                src={myComImage}
                alt={`Evento ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                {data.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{data.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {data.description}
              </p>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {data.dateForm}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  <span>{data.organizer}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {/* <Link to={``}>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </Link> */}
                {/* <Link to={``}>
                  <Button variant="secondary" size="sm">
                    Editar
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>

  
    </div>
  )
}

export default EventsPage