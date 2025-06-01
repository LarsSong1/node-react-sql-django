import db from '../db.js'




export const getRegisters = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM events")
        res.json(rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al obtener registros" })
    }
}


export const getUniqueRegister = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const { rows } = await db.query('SELECT * FROM events WHERE id = $1', [id]);

        if (rows.length === 0) {
            // No existe registro con ese id
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al obtener el registro" })
    }
}



export const createRegister = async (req, res) => {


    const {
        name,
        description,
        dateForm,
        hour,
        location,
        address,
        organizer,
        email,
        phone,
        category,
        capacity,
        freeState = false,      // valores por defecto
        outstanding = false
    } = req.body;
    try {
        const query = `
      INSERT INTO events
        (name, description, dateForm, hour, location, address, organizer, email, phone, category, capacity, freeState, outstanding)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `;

        const values = [
            name,
            description,
            dateForm,
            hour,
            location,
            address,
            organizer,
            email,
            phone,
            category,
            capacity,
            freeState,
            outstanding
        ];
        const { rows } = await db.query(query, values)
        res.status(201).json(rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}




export const updateRegister = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const {
            name,
            description,
            dateForm,
            hour,
            location,
            address,
            organizer,
            email,
            phone,
            category,
            capacity,
            freeState = false,      // valores por defecto
            outstanding = false
        } = req.body;
        const query = `
  UPDATE events
  SET
    name = $1,
    description = $2,
    dateForm = $3,
    hour = $4,
    location = $5,
    address = $6,
    organizer = $7,
    email = $8,
    phone = $9,
    category = $10,
    capacity = $11,
    freeState = $12,
    outstanding = $13
  WHERE id = $14
  RETURNING *;
`;
        const values = [
            name,
            description,
            dateForm,
            hour,
            location,
            address,
            organizer,
            email,
            phone,
            category,
            capacity,
            freeState,
            outstanding,
            id
        ];
        const { rows } = await db.query(query, values)
        res.status(201).json(rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "error al actualizar el registro" })
    }
}



export const deleteRegister = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const { rowCount } = await db.query("DELETE FROM events where id = $1", [id])
        if (rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.sendStatus(204);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "error al actualizar el registro" })

    }
}