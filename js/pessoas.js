'use strict'

const Datastore = require('nedb')
const db = {}
db.pessoas = new Datastore({filename: './databases/pessoas', autoload: true})

const Pessoas = (function(){

    const $pessoasTable = $('#pessoas-table')

    function init(){
        getAllPessoas()
    }

    function getAllPessoas(){
        var pessoas = db.pessoas.find({}, (err, docs) => {
            return buildPessoasTable(docs)
        })
    }

    function buildPessoasTable(pessoas){
        let $table = $('<table>').addClass('table')

        let $header = $('<thead>')
        let $headerRow = $('<tr>')
        $headerRow.append($('<th>').html('Nome'))
        $headerRow.append($('<th>').html('Sobrenome'))
        $headerRow.append($('<th>').html('Idade'))
        $header.append($headerRow)
        $table.append($header)

        let $tableBody = $('<tbody>')
        for(let pessoa of pessoas){
            let $pessoaRow = $('<tr>')
            $pessoaRow.append($('<td>').html(pessoa.nome))
            $pessoaRow.append($('<td>').html(pessoa.sobrenome))
            $pessoaRow.append($('<td>').html(pessoa.idade))

            $tableBody.append($pessoaRow)
        }
        $table.append($tableBody)

        $pessoasTable.append($table)


    }

    return {
        init: init
    }
})()
