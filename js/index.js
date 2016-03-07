'use strict'

const Datastore = require('nedb')
const db = {}
db.pessoas = new Datastore({filename: './databases/pessoas', autoload: true})
db.pessoas.ensureIndex({ fieldName: 'nome' }, function (err) {
  // If there was an error, err is not null
});
db.pessoas.ensureIndex({ fieldName: 'sobrenome' }, function (err) {
  // If there was an error, err is not null
});

const Index = (function(){

    function init(){
        binds()
    }

    function binds(){
        $('#pessoa-form').on('submit', function(event) {
            event.preventDefault()
            let pessoaJSON = parsePessoaToJSON($(this).serializeArray())
            addPessoa(pessoaJSON)
        })
    }

    function parsePessoaToJSON(pessoa){
        let pessoaJSON = {}
        for (let attribute of pessoa){
            pessoaJSON[attribute.name] = attribute.value
        }

        return pessoaJSON
    }

    function addPessoa(pessoa){
        db.pessoas.insert(pessoa)
    }

    return {
        init: init
    }
})()
