var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");


router.get("/ultimasSetorCPU/:idEmpresa", function (req, res) {
    setorController.buscarUltimasMedidasCPU(req, res);
});

router.get("/ultimasSetorRAM/:idEmpresa", function (req, res) {
    setorController.buscarUltimasMedidasRAM(req, res);
});

router.get("/tempo-realCPU/:idEmpresa", function (req, res) {
    setorController.buscarMedidasEmTempoRealCPU(req, res);
})

router.get("/tempo-realRAM/:idEmpresa", function (req, res) {
    setorController.buscarMedidasEmTempoRealRAM(req, res);
})
router.get("/listarMaquinas/:idEmpresa", function (req, res) {
   setorController.listarMaquinas(req, res);
  });
  
  router.get("/listarJanelas/:idEmpresa", function (req, res) {
    setorController.listarJanelas(req, res);
   });
   
 
module.exports = router;