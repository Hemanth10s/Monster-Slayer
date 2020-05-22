const path=require('path')
const express=require('express')
const hbs=require('hbs')
const bodyParser=require('body-parser')

const app=express()
const port=process.env.PORT || 3000

const pd=path.join(__dirname,'../public')
const vd=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

app.set('views',vd)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(pd))

app.get('',(req,res)=>{
        res.render('index',{
            title:'Monster Slayer',
            name:'Monster-Slayer',
        })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
