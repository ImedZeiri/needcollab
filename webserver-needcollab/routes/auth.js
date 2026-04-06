const express = require('express');
const router = express.Router();
const { callEdgeFunction } = require('./supabaseClient');

/**
 * @swagger
 * /api/send-auth-email:
 *   post:
 *     summary: Envoyer un email d'authentification
 *     responses:
 *       200:
 *         description: Email envoyé
 */
router.post('/send-auth-email', async (req, res) => {
  try {
    const { data, status } = await callEdgeFunction('send-auth-email', 'POST', req.body);
    res.status(status).json(data);
  } catch (error) {
    console.error('send-auth-email error:', error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/otp_codes:
 *   get:
 *     summary: Récupérer les codes OTP
 *     responses:
 *       200:
 *         description: Liste des codes OTP
 */
router.get('/otp_codes', async (req, res) => {
  try {
    const { data, status } = await callEdgeFunction('otp_codes', 'GET', null, { id: req.query.id });
    res.status(status).json(data);
  } catch (error) {
    console.error('otp_codes GET error:', error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/otp_codes:
 *   post:
 *     summary: Créer un code OTP
 *     responses:
 *       201:
 *         description: Code OTP créé
 */
router.post('/otp_codes', async (req, res) => {
  try {
    const { data, status } = await callEdgeFunction('otp_codes', 'POST', req.body);
    res.status(status).json(data);
  } catch (error) {
    console.error('otp_codes POST error:', error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router;
