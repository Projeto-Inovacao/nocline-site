var processosModel = require("../models/processosModel");

function listarProcessos(req, res) {
    var idMaquina = req.params.idMaquina;
    var idEmpresa = req.params.idEmpresa;

    processosModel.listarProcessos(idEmpresa, idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function listarJanelas(req, res) {
    var idMaquina = req.params.idMaquina;
    var idEmpresa = req.params.idEmpresa;

    processosModel.listarJanelas(idEmpresa, idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarJanelasDistintas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    processosModel.listarJanelasDistintas(idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarProcessos, 
    listarJanelas,
    listarJanelasDistintas
}