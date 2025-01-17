const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

// create the server
const server = http.createServer((req, res) => {
    console.log("Request for "+req.url+" by method "+ req.method);
    if(req.method == 'GET'){
        var fileURL;
        if(req.url == '/') fileURL  = '/index.html';
        else fileURL = req.url;
        var filePath = path.resolve('./public' + fileURL);
        const fileExt = path.extname(filePath);  // checking extension
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text-html');
                    res.end('<html><body><h1>Error 404: '+fileURL+" not found</h1></body></html>");
                
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text-html');
            res.end('<html><body><h1>Error 404: '+fileURL+" not HTML file</h1></body></html>");
        
            return;
        }    
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text-html');
        res.end('<html><body><h1>Error 404: '+req.method+" not a get request.</h1></body></html>");
    
        return;
    }

})

//start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});