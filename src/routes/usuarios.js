var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})
router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

// router.post("/autenticar", function (req, res) {
//     usuarioController.autenticar(req, res);
// });



module.exports = router;