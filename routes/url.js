const express = require('express');
const router = express.Router();
const Url = require('../Moongose/moongose'); 

router.post('/', async (req, res) => {
  try {
    const url = req.body.url;
    const id = Math.random().toString(36).substring(7);
    const newUrl = new Url({ url, id, clicks: 0 });
    await newUrl.save();
    return res.json({ id });
  } catch (error) {
    console.error('Error saving URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}).get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    return res.json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const url = await Url.findOne({ id });
    if (!url) {
      console.error('URL not found for ID:', id);
      return res.sendStatus(404);
    }
    await Url.updateOne({ id }, { $inc: { clicks: 1 } });
    return res.json(url);
  } catch (error) {
    console.error('Error fetching URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/analytics/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const url = await Url.findOne({ id });
    if (!url) {
      console.error('URL not found for ID:', id);
      return res.sendStatus(404);
    }
    return res.json({ clicks: url.clicks });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;