const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express()

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({
    msg: 'This is a test response!'
  });
});

app.post('/generatePDF', async (req, res) => {
  const html = req.body;
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const buffer = await page.pdf({ format: 'A4' })
    await browser.close();
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': buffer.length });
    res.send(buffer);

  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log('Server is up on port ', port);
});