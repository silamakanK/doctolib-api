import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Doctolib API'});
});

export default router;