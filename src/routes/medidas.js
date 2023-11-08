var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimasDisco/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/ultimasCPU/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCPU(req, res);
});

router.get("/ultimasRAM/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRAM(req, res);
});

router.get("/ultimasTemp/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasTemp(req, res);
});

router.get("/tempo-realTemp/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealTemp(req, res);
})

router.get("/ultimasREDE/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRede(req, res);
});

router.get("/ultimasDesempenho/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDesempenho(req, res);
});

router.get("/ultimasJanelas/:idMaquina", function (req, res) {
    medidaController.buscarUltimasJanelas(req, res);
});

router.get("/tempo-realCPU/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCPU(req, res);
})

router.get("/tempo-realRAM/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRAM(req, res);
})

router.get("/tempo-realRede/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRede(req, res);
})

router.get("/tempo-realDisco/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

router.get("/tempo-realDesempenho/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDesempenho(req, res);
})

router.get("/tempo-realJanelas/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealJanelas(req, res);
})

module.exports = router;