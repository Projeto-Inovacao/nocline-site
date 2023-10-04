var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

// function autenticar(req, res) {
//     var emailEmpresa = req.body.emailEmpresaServer;
//     var senha = req.body.senhaServer;

//     if (emailEmpresa == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         usuarioModel.autenticar(emailEmpresa, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);

//                         aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
//                             .then((resultadoAquarios) => {
//                                 if (resultadoAquarios.length > 0) {
//                                     res.json({
//                                         id: resultadoAutenticar[0].id,
//                                         emailEmpresa: resultadoAutenticar[0].email,
//                                         nome: resultadoAutenticar[0].nome,
//                                         senha: resultadoAutenticar[0].senha,

//                                     });
//                                 } else {
//                                     res.status(204).json({ aquarios: [] });
//                                 }
//                             })
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller")



    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var emailEmpresa = req.body.emailEmpresaServer;
    var celularEmpresa = req.body.celularEmpresaServer;
    var senhaEmpresa = req.body.senhaEmpresaServer;

 
   
   
       if (razaoSocial == undefined) {
            res.status(400).send("Sua razaoSocial está undefined!");
        } else if (cnpj == undefined) {
            res.status(400).send("Sua cnpj de senha está undefined!");
        } else if (emailEmpresa == undefined) {
            res.status(400).send("Sua Email da Empresa está undefined!");
        } else if (celularEmpresa == undefined) {
            res.status(400).send("Sua telefoneCelular está undefined!");
        } else if (senhaEmpresa == undefined) {
            res.status(400).send("Seu senha está undefined!");

        } 
        else {
     // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
     usuarioModel.cadastrarEmpresa( razaoSocial, cnpj, emailEmpresa, celularEmpresa, senhaEmpresa)
     .then(
         function (resultado) {
             res.json(resultado);
         }
     ).catch(
         function (erro) {
             console.log(erro);
             console.log(
                 "\nHouve um erro ao realizar o cadastro! Erro: ",
                 erro.sqlMessage
             );
             res.status(500).json(erro.sqlMessage);
         }
     );
}
}
function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller")

    var cep = req.body.cepServer;
    var pais = req.body.paisServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;


    // Faça as validações dos valores
   
        if (cep == undefined) {
            res.status(400).send("Seu cep está undefined!");
        } else if (pais == undefined) {
            res.status(400).send("Seu pais está undefined!");
        } else if (estado == undefined) {
            res.status(400).send("Seu estado está undefined!");
        } else if (bairro == undefined) {
            res.status(400).send("Seu bairro está undefined!");
        } else if (rua == undefined) {
            res.status(400).send("Sua data de nascimento está undefined!");
        } else if (cidade == undefined) {
            res.status(400).send("Sua cidade está undefined!");
        } else if (numero == undefined) {
            res.status(400).send("Seu numero está undefined!");
        }
        else {
     // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
     usuarioModel.cadastrarEmpresa(cep, pais, estado, cidade, bairro, rua, numero, complemento)
     .then(
         function (resultado) {
             res.json(resultado);
         }
     ).catch(
         function (erro) {
             console.log(erro);
             console.log(
                 "\nHouve um erro ao realizar o cadastro! Erro: ",
                 erro.sqlMessage
             );
             res.status(500).json(erro.sqlMessage);
         }
     );
}
}

module.exports = {
// autenticar,
cadastrarEmpresa,
cadastrarEndereco
}



// cep, pais, estado, cidade, bairro, rua, numero, complemento, razaoSocial, cnpj, emailEmpresa, telefoneCelular, senha, confirmaSenha, nome


