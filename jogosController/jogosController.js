const Sequelize = require('sequelize')
const conexao = require('../database/database')

const Jogo = conexao.define('jogo',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    preco:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports = Jogo