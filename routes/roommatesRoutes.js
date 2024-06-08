import express from 'express';
import { getRoommates, addRoommate } from '../controllers/rommatesController.js';

const router = express.Router();

router.get('/', getRoommates);
router.post('/', addRoommate);

export default router;
