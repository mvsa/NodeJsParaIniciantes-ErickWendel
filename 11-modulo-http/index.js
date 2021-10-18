const http = require('http')

http.createServer((request, response)=>{
    response.end('Hello')
})
.listen(5000,()=>console.log('server running on port 5000'))
