const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')

const app=express()
const port=process.env.PORT || 3000

const pd=path.join(__dirname,'../public')
const vd=path.join(__dirname,'../templates/views')

app.set('views',vd)
app.engine('html', require('ejs').renderFile);
app.set('view engine','html')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(pd))

app.get('',(req,res)=>{
        res.render('index')
})
app.get('/title',(req,res)=>{
    res.send({title:'Monster Slayer',name:'Monster-Slayer'})
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
