const express = require("express");
const app = express();
const {scrape}= require('./scrape')
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(express.json())


app.post("/url", async (req, res) => {
    const data=req.body
    console.log(data.url);
    if (data) {
        const url = data.url;
        const collection_name=data.collection_name;
        await scrape(url,collection_name);
        res.send("successfully scraped");
    }else{
        res.send("No data send");
    }
});

app.listen(3000, () => {
  console.log("App is running at 3000");
});
