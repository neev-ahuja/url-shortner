require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const url = require('./routes/url');
const Url = require('./Moongose/moongose'); 
app.use(express.static(path.join(__dirname, "client", "dist")));

if (dev) {
  const webpackDev = require("./dev");
  app.use(webpackDev.comp).use(webpackDev.hot);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const url = await Url.findOne({ id });
    if (!url) {
      console.error('URL not found for ID:', id);
      return res.sendStatus(404);
    }
    await Url.updateOne({ id }, { $inc: { clicks: 1 } });
    return res.redirect(url.url);
  } catch (error) {
    console.error('Error fetching URL:', error);
    return res.send('Internal Server Error');
  }
});

app.use(express.json());
app.use(cors());
app.use('/url' , url);


app.listen(3000, function () {
  console.log("Server started on :3000");
});
