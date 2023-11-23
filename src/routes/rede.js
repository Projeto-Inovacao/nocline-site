var express = require("express");
var router = express.Router();

var RedeController = require("../controllers/RedeController");

router.get("/ultimasREDE/:idMaquina", function (req, res) {
    RedeController.buscarUltimasMedidasRede(req, res);
});

router.get("/tempo-realRede/:idMaquina", function (req, res) {
    RedeController.buscarMedidasEmTempoRealRede(req, res);
})

router.get("/ultimasDesempenho/:idMaquina", function (req, res) {
    RedeController.buscarUltimasMedidasDesempenhoR(req, res);
});

router.get("/tempo-realDesempenho/:idMaquina", function (req, res) {
    RedeController.buscarMedidasEmTempoRealDesempenhoR(req, res);
})

module.exports = router;