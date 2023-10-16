var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/listar/:idEmpresa/:idMaquina", function (req, res) {
  processosController.listarProcessos(req, res);
});


module.exports = router;