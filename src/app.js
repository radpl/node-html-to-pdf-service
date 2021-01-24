const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express()

const port = process.env.PORT || 3001;

app.use(cors());
//app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

app.get('/test', (req, res) => {
  res.json({
    msg: 'This is a test response!'
  });
});
app.get('/generateTestPDF', async (req, res) => {
  console.log('generateTestPDF');
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent('<html><body>Test PDF</body></html>', { waitUntil: 'domcontentloaded' });
    const buffer = await page.pdf({ format: 'A4' })
    await browser.close();
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': buffer.length });
    res.send(buffer);

  } catch (error) {

    res.status(400).send(error);
  }
});

app.post('/generatePDF', async (req, res) => {
  //console.log('generatePDF');
  const html = req.body;
  console.log(req.body);
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html.html, { waitUntil: 'domcontentloaded' });
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: "5px", right: "5px", bottom: "5px", left: "5px" }
    });
    await browser.close();
    res.set({ 'Content-Type': 'application/pdf' });
    res.send(buffer);

  } catch (error) {

    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log('Server is up on port ', port);
});