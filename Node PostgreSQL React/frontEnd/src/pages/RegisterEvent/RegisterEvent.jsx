import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Dependencias Generales
import axios from 'axios'

// Dependencias de Notifiaciones
import { toast } from 'sonner'

// Dependencias Formulario
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


// componentes Shadcn
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"

// iconos 
import { CalendarIcon, ChevronLeftIcon } from "lucide-react"

// utilidades
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"



const formSchema = z.object({
  name: z.string().min(5, { message: "El nombre debe tener al menos 5 caracteres" }),
  description: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
  dateForm: z.date({ required_error: "La fecha es requerida" }),
  hour: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Formato de hora inválido (HH:MM)" }),
  location: z.string().min(5, { message: "La ubicación debe tener al menos 5 caracteres" }),
  address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres" }),
  organizer: z.string().min(3, { message: "El organizador debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/, { message: "Número de teléfono inválido" }),
  category: z.string({ required_error: "Seleccione una categoría" }),
  capacity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El aforo debe ser un número positivo",
  }),
  freeState: z.boolean().default(false),
  outstanding: z.boolean().default(false),
})

const RegisterEvent = () => {
  const [date, setDate] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      address: "",
      organizer: "",
      email: "",
      phone: "",
      hour: "",
      capacity: "",
      freeState: false,
      outstanding: false,
    },
  })

  async function onSubmit(data) {
    // Aquí iría la lógica para enviar los datos al servidor
    try {
      console.log(data)
      const response = await axios.post('http://localhost:3000/registros', data)
      toast.success("Evento registrado correctamente. Tu evento ha sido registrado");
    } catch (err) {
      toast.error('Ocurrio un error al intentar crear el evento')
      console.error(err)
    }
  }


  return (
    <div className="container mx-auto py-10">
      <div className='flex justify-start items-center gap-2'>
        <Link to={'/lista'} className='bg-green-300 px-2 py-1 rounded-md'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg>
        </Link>
        <p className='font-light'>Volver a Listado</p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Registrar Nuevo Evento</CardTitle>
          <CardDescription>Completa el formulario con los detalles de tu evento comunitario.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información básica</h3>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del evento *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Taller de reciclaje comunitario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe los detalles del evento..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dateForm"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: es })
                                ) : (
                                  <span>Selecciona una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora *</FormLabel>
                        <FormControl>
                          <Input type="time" placeholder="18:00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="deportivo">Deportivo</SelectItem>
                          <SelectItem value="educativo">Educativo</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="ambiental">Ambiental</SelectItem>
                          <SelectItem value="salud">Salud</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aforo máximo *</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="100" {...field} />
                        </FormControl>
                        <FormDescription>Número máximo de participantes</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col space-y-4 justify-end">
                    <FormField
                      control={form.control}
                      name="freeState"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Evento gratuito</FormLabel>
                            <FormDescription>Marca esta opción si el evento no tiene costo</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ubicación</h3>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lugar *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Centro Comunitario Municipal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Calle Principal #123, Colonia Centro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Organizador</h3>

                <FormField
                  control={form.control}
                  name="organizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del organizador *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Asociación Vecinal del Barrio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contacto@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono de contacto *</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="outstanding"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Solicitar destacado</FormLabel>
                        <FormDescription>
                          Solicita que tu evento aparezca en la sección destacada (sujeto a aprobación)
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link to="/lista">Cancelar</Link>
                </Button>
                <Button type="submit">Registrar Evento</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <p>* Campos obligatorios</p>
          <p>La información será revisada antes de ser publicada</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterEvent