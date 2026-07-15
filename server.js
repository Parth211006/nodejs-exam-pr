import express from 'express';
import database from './configs/database.js';
import router from './routers/user.route.js';
import envConfig from './configs/envConfig.js';
const app= express();
app.use(express.json())
app.use('/api/user',router)
app.get('/',(req,res)=>{
    res.send("user Auth")
})
app.listen(envConfig.PORT,(error)=>{
    if(error){
        console.log(error.message)
    }
    else{
        console.log('server start')
        console.log('http://localhost:'+envConfig.PORT);
    }
})
