import express from 'express';
import chalk from 'chalk';
import userRoutes from './api/v1/routes/user-routes.js'
const app=express();
//console.log("Express", typeof express); will return that express is a function
//console.log("App", typeof app); will return that app is a function inside express!!
// trying app routes which are now imported using import... 
// app.get('/',(req,res)=>{
//     res.send('<h1>Hello User</h1>')
// })
// app.get('/Login',(req,res)=>{
//     res.send('<h1>You are Logged in!</h1>')
// })
app.use('/api/v1/user', userRoutes)
const server=app.listen(2026,(err)=>{
    if(err){
        console.log(chalk.redBright("Server Crash!!",err));
    }
    else{
        console.log(chalk.greenBright.bold("Node has started using port:",server.address().port)); // A node in distributed servers has started
    }
})