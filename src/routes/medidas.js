var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/ultimasDisco/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/ultimasCPU/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCPU(req, res);
});

router.get("/ultimasRAM/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRAM(req, res);
});

router.get("/ultimasREDE/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRede(req, res);
});

router.get("/ultimasDesempenho/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDesempenho(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;