var setorModel = require("../models/setorModel");



function buscarUltimasMedidasCPU(req, res) {

    const limite_linhas = 1;

    var idEmpresa = req.params.id_empresa;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    setorModel.buscarUltimasMedidasCPU(idEmpresa, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarMedidasEmTempoRealCPU(req, res) {

    var idEmpresa = req.params.id_empresa;

    console.log(`Recuperando medidas em tempo real`);

    setorModel.buscarMedidasEmTempoRealCPU(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarUltimasMedidasRAM(req, res) {

    const limite_linhas = 1;

    var idEmpresa = req.params.id_empresa;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    setorModel.buscarUltimasMedidasRAM(idEmpresa, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarMedidasEmTempoRealRAM(req, res) {
    var idEmpresa = req.params.id_empresa;
    console.log(idEmpresa)

    console.log(`Recuperando medidas em tempo real`);

    setorModel.buscarMedidasEmTempoRealRAM(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function listarMaquinas(req, res) {
    console.log("AAAAAAAAAAAAAAAAAAAAAA TABELA ")
    var idEmpresa = req.params.idEmpresa;
  
    setorModel.listarMaquinas(idEmpresa)
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

    setorModel.listarJanelas(idEmpresa, idMaquina)
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
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealCPU,
    buscarMedidasEmTempoRealRAM,
    listarMaquinas,
    listarJanelas


}