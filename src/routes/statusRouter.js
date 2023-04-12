import express from 'express';
import { updateStatusService } from '../services/status/updateStatusService.js';

const router = new express.Router()

router.post('/status', async (req, res) => {
    try {
        const participant = req.headers.user.trim()
        if (!participant) throw ""
        await updateStatusService(participant)
        
        res.send()
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
    
})


export default router;