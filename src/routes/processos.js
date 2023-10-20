var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/listar/:idEmpresa/:idMaquina", function (req, res) {
  processosController.listarProcessos(req, res);
});

router.get("/listarColab/:idEmpresa", function (req, res) {
  processosController.listarColab(req, res);
});

module.exports = router;