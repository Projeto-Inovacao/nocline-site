function validarSessao() {
    var id = sessionStorage.ID_EMPRESA;
    console.log(id)
    var nome = sessionStorage.NOME_USUARIO;
    console.log(nome)
    
    empresaModel.buscarMaquinasPorEmpresa(id).then((resultadoMaquinas) => {
        if (resultadoMaquinas.length > 0) {
            res.json({
                maquinas: resultadoMaquinas
            });
            var maquinasJSON = JSON.stringify(resultadoMaquinas);
            sessionStorage.MAQUINAS = maquinasJSON;
        } else {
            res.status(204).json({ Maquinas: [] });
        }
    })



    if (id != null && nome != null) {
        var b_usuario = document.getElementById("b_usuario")
        var n_usuario = document.getElementById("n_usuario");

        b_usuario.innerHTML = id;
        n_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}
/*
function limparSessao() {
    sessionStorage.clear();
}
*/
