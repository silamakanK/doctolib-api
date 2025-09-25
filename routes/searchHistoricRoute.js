import express from "express";
import searchHistoricController from "../controllers/searchHistoricController.js";

const router = express.Router();

router.route('/:id').get(searchHistoricController.getAllHistoricsByPatientId);

export default router;