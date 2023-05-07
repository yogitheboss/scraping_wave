const cheerio = require('cheerio');

let url="https://www.amazon.in/Super-Rockerz-400-Bluetooth-Headphones/dp/B01FSYQ3XA/ref=sr_1_7?keywords=headphones&qid=1683487828&s=electronics&sr=1-7"


const axios = require('axios');
async function scrapeUrl(url) {
    await axios.get(url).then((res)=>{
        const $ = cheerio.load(res.data);
        let name = $('#productTitle').text().trim();
        let imgUrl = $("#landingImage").attr("src")
        
        console.log(name)
        console.log(imgUrl)
    })
}
scrapeUrl(url)