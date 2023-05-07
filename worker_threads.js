// const {parentPort,threadId} = require('worker_threads');

// const url= require('worker_threads').workerData;
// msg=12
// for(let i=0;i<10000000000;i++){
//     // do nothing
//     msg++;
// }

// parentPort.postMessage(url);

const axios = require('axios');
const url = "https://github.com/yogitheboss?tab=repositories&q=&type=&language=javascript&sort="
const pretty = require('pretty');
const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');
const { parentPort, threadId } = require('worker_threads');

async function scrape(url) {
    try{
        const {data}= await axios.get(url);
        const $ = cheerio.load(data);
        const repoList = $('[itemprop="name codeRepository"]');
        const reponames = [];
        repoList.each((i, el) => {
            reponames.push($(el).text().trim());
        })

        const repoUrls=[];
        repoList.each((i,el)=>{
            repoUrls.push("https://github.com"+$(el).attr('href'));
        })
        console.log(repoList);
        console.log(reponames);
    }catch(err){
        console.log(err);
    }    
}


