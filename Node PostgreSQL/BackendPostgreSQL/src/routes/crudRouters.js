import { Router } from 'express';
import {createRegister, deleteRegister, getRegisters, getUniqueRegister, updateRegister} from '../controllers/crudController.js'


const router = Router();

router.get('/registers', getRegisters);
router.get('/registers/:id', getUniqueRegister)
router.post('/registers', createRegister)
router.put('/registers/:id', updateRegister)
router.delete('/registers/:id', deleteRegister)






export default router
