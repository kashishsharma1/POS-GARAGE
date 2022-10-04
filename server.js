const express = require('express');
const dbConnect = require('./dbConnect');

const app = express();
app.use(express.json());
const itemsRoute = require('./Routes/ItemsRoute');
const usersRoute = require('./Routes/UserRoute');
const billsRoute = require('./Routes/BillsRoute');

app.use('/api/items/',itemsRoute);
app.use('/api/users/',usersRoute);
app.use('/api/bills/',billsRoute);

const path = require('path')

if(process.env.NODE_ENV==='production'){
    app.use('/',express.static('client/build'))
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}
const port = process.env.PORT || 5000;
/*
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
*/
app.get("/",(req,res) => res.send('Hello Word!'));
app.listen(port, () => console.log(`Nodejs server running on port ${port}!`));
