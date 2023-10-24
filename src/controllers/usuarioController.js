const { json } = require("express");
var usuarioModel = require("../models/usuarioModel");

function entrar(req, res) {
    var email = req.body.emailEmpresaServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
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

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller")

    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;

    if (razaoSocial == undefined) {
        res.status(400).send("Sua razaoSocial está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(razaoSocial, cnpj)
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
    var cnpj = req.body.cnpjServer;
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
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj de senha está undefined!");
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
        usuarioModel.cadastrarEndereco(cep, numero, rua, bairro, cidade, estado, pais, complemento, cnpj)
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

function cadastrarColaborador1(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller")

    var nome = req.body.nomeCServer;
    var email = req.body.emailCServer;
    var cpf = req.body.cpfCServer;
    var senha = req.body.senhaCServer;
    var celular = req.body.celularCServer;
    var setor = req.body.setorCServer;
    var codigo = req.body.codigoCServer;


    // Faça as validações dos valores

    if (nome == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua cnpj de senha está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu pais está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (setor == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarColaborador1(nome, cpf, email, senha, celular, codigo, setor)
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

function cadastrarColaborador(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller colab")
    var cnpj = req.body.cnpjServer;
    var nomeRepresentante = req.body.nomeRepresentanteServer;
    var emailRepresentante = req.body.emailRepresentanteServer;
    var celularRepresentante = req.body.celularRepresentanteServer;
    var cpfRepresentante = req.body.cpfRepresentanteServer;
    var senhaRepresentante = req.body.senhaRepresentanteServer;

    // Faça as validações dos valores
    if (nomeRepresentante == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ de senha está undefined!");
    }
    else if (emailRepresentante == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    } else if (senhaRepresentante == undefined) {
        res.status(400).send("Seu senha está undefined!");
    } else if (celularRepresentante == undefined) {
        res.status(400).send("Seu celular está undefined!");
    } else if (cpfRepresentante == undefined) {
        res.status(400).send("Seu setor está undefined!");
    } else if (senhaRepresentante == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarColaborador(nomeRepresentante, cpfRepresentante, emailRepresentante, celularRepresentante, senhaRepresentante, cnpj)
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

function cadastrarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller maqqqq")

    var codEmpresa = req.body.codEmpServer;
    var setor = req.body.maquinaSetorServer;
    var so = req.body.maquinaSOServer;
    var modelo = req.body.maquinaModeloServer;
    var ip = req.body.maquinaIPServer;
    var hostname = req.body.maquinaHostnameServer;


    // Faça as validações dos valores
    if (codEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (setor == undefined) {
        res.status(400).send("Seu CNPJ de senha está undefined!");
    } else if (so == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    } else if (ip == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    } else if (hostname == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarMaquina(codEmpresa, setor, so, modelo, ip, hostname)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de maquina! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function alterarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller da maquina")

    var codEmpresa = req.body.codEmpresaServer;
    var id = req.body.idMaquinaServer;
    var ip = req.body.ipServer;
    var so = req.body.soServer;
    var hostname = req.body.hostnameServer;
    var modelo = req.body.modeloServer;
    var setor = req.body.setorServer;

    // Faça as validações dos valores
    if (codEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (id == undefined) {
        res.status(400).send("Seu CNPJ de senha está undefined!");
    } else if (ip == undefined) {
        res.status(400).send("Seu CNPJ de senha está undefined!");
    } else if (so == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    } else if (hostname == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    } else if (setor == undefined) {
        res.status(400).send("Sua email de senha está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.alterarMaquina(codEmpresa, id, so, ip, hostname, modelo, setor)
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

function excluirMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller")

    var idEmpresa = req.body.idEmpresaServer;
    var idMaquina = req.body.idMaquinaServer;

    // Faça as validações dos valores

    if (idEmpresa == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (idMaquina == undefined) {
        res.status(400).send("Seu pais está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.excluirMaquina(idEmpresa, idMaquina)
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


function alterarColaborador(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller")

    var id = req.body.idServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var celular = req.body.celularServer;
    var setor = req.body.setorServer;
    var codigo = req.body.cdEmpServer;



    // Faça as validações dos valores

    if (id == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua cnpj de senha está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu pais está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (setor == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.alterarColaborador(id, email, celular, senha, setor, codigo)
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


function excluirColaborador(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("entrei validacao controller")

    var id = req.body.idServer;
    var codigo = req.body.cdEmpServer;



    // Faça as validações dos valores

    if (id == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Seu pais está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.excluirColaborador(id, codigo)
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
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarColaborador,
    cadastrarMaquina,
    alterarMaquina,
    excluirMaquina,
    entrar,
    cadastrarColaborador1,
    alterarColaborador,
    excluirColaborador
}



// cep, pais, estado, cidade, bairro, rua, numero, complemento, razaoSocial, cnpj, emailEmpresa, telefoneCelular, senha, confirmaSenha, nome


