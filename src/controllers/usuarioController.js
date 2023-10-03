var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var emailEmpresa = req.body.emailEmpresaServer;
    var senha = req.body.senhaServer;

    if (emailEmpresa == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(emailEmpresa, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        emailEmpresa: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,

                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html


    var cep = req.body.cepServer;
    var pais = req.body.paisServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    var nome = req.body.nomeServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var emailEmpresa = req.body.emailEmpresaServer;
    var telefoneCelular = req.body.telefoneCelularServer;
    var senha = req.body.senhaServer;
    var confirmaSenha = req.body.confirmaSenhaServer;
    // Faça as validações dos valores
    if (nome == undefined) {
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
        } else if (razaoSocial == undefined) {
            res.status(400).send("Sua razaoSocial está undefined!");
        } else if (cnpj == undefined) {
            res.status(400).send("Sua cnpj de senha está undefined!");
        } else if (emailEmpresa == undefined) {
            res.status(400).send("Sua Email da Empresa está undefined!");
        } else if (telefoneCelular == undefined) {
            res.status(400).send("Sua telefoneCelular está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("Seu senha está undefined!");
        } else if (confirmaSenha == undefined) {
            res.status(400).send("Sua confirmar Senha está undefined!");
        } 
        else {

            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            usuarioModel.cadastrar(cep, pais, estado, cidade, bairro, rua, numero, complemento, razaoSocial, cnpj, emailEmpresa, telefoneCelular, senha, confirmaSenha, nome)
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


        module.exports = {
            autenticar,
            cadastrar
        }
    }
}


