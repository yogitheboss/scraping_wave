const { parentPort, threadId } = require('worker_threads');
const axios = require('axios');
const cheerio = require('cheerio');
const urls = require('worker_threads').workerData;
const fs = require('fs');
parentPort.postMessage(`Worker ${threadId} started`);

let result = [];
async function scrapeUrl(url) {
  try {
    let name = "";

    const res = await axios.get(url)
    const $ = cheerio.load(res.data);
    let reviews = [];
    name = $('#productTitle').text().trim();
    let imgUrl = $("#landingImage").attr("src")
    $("#ivLargeImage .fullscreen").src
    $('.review .a-spacing-none').each(function (el, index) {
      let title = $(this).find('.review-title').text().trim();
      let date = $(this).find('.review-date').text().trim();
      let rating = $(this).find('.review-rating span').first().text().trim();
      let text = $(this).find('.review-text-content span').first().text().trim();
      if (title && date && rating && text) {
        let review = { title, date, rating, text };
        reviews.push(review);
      }
    });
    result.push({ name: name, imgUrl: imgUrl, reviews: reviews });
    console.log(`Worker ${threadId} finished scraping ${url}`);
  } catch (err) {
    console.log(err);
  }
}

async function scrapeUrls(urls) {
  for (const url of urls) {
    await scrapeUrl(url);
  }
}

scrapeUrls(urls).then(() => {
  // saving data
  fs.writeFile(`review${threadId}.json`, JSON.stringify(result), (err) => {
    if (err) throw err;
    console.log(`Reviews saved to review${threadId}.json`);
  });
  parentPort.postMessage(result);
}).catch((err) => {
  console.log(err);
});