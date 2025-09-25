import express from "express";
import doctofeedController from "../controllers/doctofeedController.js";

const router = express.Router();

router.route('/')
    .get(doctofeedController.getAllFeeds);

router.route('/:id')
    .get(doctofeedController.getFeedById);


export default router;