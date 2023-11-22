var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");


router.get("/ultimasREDE/:idMaquina", function (req, res) {
    redeController.buscarUltimasMedidasRede(req, res);
});

router.get("/tempo-realRede/:idMaquina", function (req, res) {
    redeController.buscarMedidasEmTempoRealRede(req, res);
})

router.get("/ultimasDesempenho/:idMaquina", function (req, res) {
    redeController.buscarUltimasMedidasDesempenhoR(req, res);
});

router.get("/tempo-realDesempenho/:idMaquina", function (req, res) {
    redeController.buscarMedidasEmTempoRealDesempenhoR(req, res);
})

module.exports = router;