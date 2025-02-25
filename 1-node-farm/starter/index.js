const fs = require('fs');
const http = require('http');
const url = require('url');

// READ & WRITE FILE

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File has written...');

// Non-blocking, Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('ERROR 💥');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}.\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written...! 😊');
//             })
//         });
//     });
// });
// console.log('Will read file!');

// SERVER

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
}


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

const server  = http.createServer((req, res) => {
    // console.log(req.url);
    const pathName = req.url;

    // Overview Page
    if(pathName === '/overview' || pathName === "/") {
        res.writeHead(200, {'Content-type' : 'text/html'});

        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el))

        res.end(tempOverview)

    // Product Page
    }else if (pathName === '/product'){
        res.end(tempProduct)

    // API Page
    } else if (pathName === "/api") {
            res.writeHead(200, {'Content-type' : 'application/json'});
            res.end(data);

    // Not Found Page
    } else {
        res.writeHead(404, {
            "Content-Type" : "text/html",
            "my-own-header" : "hello World"
        });
        res.end('<h1>Page not Found!!!</h1>');
    }
    
    // res.end('Hello Node Server...!')
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server running on localhost port 8000');
});