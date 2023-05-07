const worker = require('worker_threads');
// const url = ["https://github.com/yogitheboss?tab=repositories&q=&type=&language=javascript&sort=",
//     "hello", "world", "hell", "wor", "ld", "hel", "worl", "d", "he", "llo", "wor", "ld", "hello",
//     "world", "hello"];
const workerCount = 6;

workers = [];
console.log(url.length);

// divide the urls among the workers


let remainginUrls = url.length;
let remainingThreads = workerCount;
let j = 0
for (let i = 0; i < workerCount; i++) {
    workers[i] = new worker.Worker('./worker_threads.js', { workerData: url.slice(j, j + Math.ceil(remainginUrls / remainingThreads)) });
    j += Math.ceil(remainginUrls / remainingThreads);
    remainingThreads--;
    remainginUrls -= Math.ceil(remainginUrls / remainingThreads);
    workers[i].on('message', (msg) => {
        console.log(msg);
    })
}


for (let i = 0; i < workerCount; i++) {
    workers[i] = new worker.Worker('./worker_threads.js', { workerData: url.slice(i * url.length / workerCount, (i + 1) * url.length / workerCount) });
    workers[i].on('message', (msg) => {
        console.log(msg);
    }
    )
}









// workers[0]= new worker.Worker('./worker_threads.js',{workerData:url[0]});
// workers[1]= new worker.Worker('./worker_threads.js',{workerData:url[1]});
// workers[2]= new worker.Worker('./worker_threads.js',{workerData:url[2]});
// workers[3]= new worker.Worker('./worker_threads.js',{workerData:url[3]});
// workers[4]= new worker.Worker('./worker_threads.js',{workerData:url[4]});
// workers[5]= new worker.Worker('./worker_threads.js',{workerData:url[5]});
// workers.forEach((worker)=>{
//     worker.on('message',(msg)=>{
//         console.log(msg);
//     })
// })
