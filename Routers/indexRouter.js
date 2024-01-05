const express = require('express');
const router = express.Router();
const { authorize, getAllTimeCount } = require('../googleSheet');

router.get('/alltime', async (req, res) => {
    const list = await authorize().then(getAllTimeCount).catch(console.error);
    res.status(200).json({list});
});

router.get('/thisweek', (req, res) => {

});

router.get('/lastweek', (req, res) => {

});

router.get('/streakdays', (req, res) => {

});

module.exports = router;