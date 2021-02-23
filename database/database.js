const Sequelize = require('sequelize')
const conexao = new Sequelize('locadora','root','admin',{
    host:'localhost',
    port:3307,
    dialect:'mysql'
})

module.exports = conexao