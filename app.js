const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3000
//imports DATABASE//
const conexao = require('./database/database')
const jogosController = require('./jogosController/jogosController')
///////////////////////


//config CORS
app.use(cors())


//autenticação da conexão
conexao.authenticate().then(()=>{
    console.log('conectado ao mysql')
}).catch(err=>{
    console.log('Erro ao conectar ::',err)
})

//config body-parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//Rotas , end points
app.get('/games',(req,res)=>{
   jogosController.findAll().then(games=>{
       res.send(games)
       res.sendStatus(200)
   }).catch(err=>{
       err
   })
})

app.get('/game/:id',(req,res)=>{
    let id = parseInt(req.params.id)
        if(!isNaN(id)){
            if(id != undefined){
                jogosController.findByPk(id).then(game=>{
                    res.send(game)
                    res.sendStatus(200)
                }).catch(err=>{
                    if(err){
                        console.log('erro')
                    }
                })
            }else{
                res.sendStatus(400)
            }
        }else{
            res.sendStatus(400)
        }
})

app.post('/game',(req,res)=>{
    
    let nome = req.body.nome
    let preco = req.body.preco
    
        if(nome != undefined && preco !=undefined){
             jogosController.create({
                nome,
                preco
            })
            res.sendStatus(200)
        }
   
})

app.delete('/game/:id',(req,res)=>{
    let id = req.params.id
        if(!isNaN(id)){
            if(id != undefined){
                jogosController.destroy({
                    where:{
                        id:id
                    }
                    
                })
                res.sendStatus(200)
            }
        }    
})

app.put('/game/:id',(req,res)=>{
    let id = req.params.id
    let nome = req.body.nome
    let preco = req.body.preco

       jogosController.update({nome:nome,preco:preco},{
           where:{
               id:id
           }
           
       })
       res.sendStatus(200)
    })
        


app.listen(PORT,()=>{
    console.log('Servidor ativo')
})