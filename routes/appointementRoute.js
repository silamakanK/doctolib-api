import express from 'express';
import appointementController from '../controllers/appointementController.js';

const router = express.Router();

router.route('/')
    .get(appointementController.getAllAppointements)
    .post(appointementController.createAppointement);

router.route('/:id')
    .get(appointementController.getAppointementByPatientId)
    .put(appointementController.updateAppointement)
    .delete(appointementController.deleteAppointement);

export default router;