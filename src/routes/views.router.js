import express from 'express';

const router = express.Router();

// Renderiza la vista 'index.handlebars'
router.get('/', (req, res) => {
    res.render('index');
});

export default router;
