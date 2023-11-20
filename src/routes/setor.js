var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");


router.get("/ultimasSetorCPU/:idMaquina", function (req, res) {
    setorController.buscarUltimasMedidasCPU(req, res);
});

router.get("/ultimasSetorRAM/:idMaquina", function (req, res) {
    setorController.buscarUltimasMedidasRAM(req, res);
});



module.exports = router;