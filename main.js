const worker = require('worker_threads');
const axios = require('axios');
const cheerio = require('cheerio');

const url_main = "https://www.amazon.in/s?k=headphones&rh=n%3A1389401031&ref=nb_sb_noss";
async function scrape(website_url) {
    const url = [];
    try {
        const { data } = await axios.get(website_url);
        const $ = cheerio.load(data);
        const product_a = $('[data-component-type="s-product-image"]>.a-link-normal.s-no-outline');
        product_a.each((i, el) => {
            url.push(`https://www.amazon.in${$(el).attr('href').trim()}`);
        })
        
        if (url.length != 0) {
            const workerCount = 6;
            let workers = [];
            let urlsToPass = Array(workerCount).fill([]);
            let k = 0;
            for (let i = 0; i < workerCount; i++) {
                urlsToPass[i] = url.slice(k, k + Math.floor(url.length / workerCount));
                k += Math.floor(url.length / workerCount)
            }
            // now dividing the remaining urls
            let temp = k;
            console.log(url.length - k);
            for (let i = 0; i < url.length - k; i++) {
                urlsToPass[i].push(url[temp]);
                temp++;
            }

            for (let i = 0; i < workerCount; i++) {
                workers[i] = new worker.Worker('./worker_threads.js', { workerData: urlsToPass[i] });
                workers[i].on('message', (msg) => {
                    
                })
            }

        }
    } catch (err) {
        console.log(err);
    }
}
scrape(url_main)

