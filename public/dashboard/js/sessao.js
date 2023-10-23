function validarSessao(){
    var id = sessionStorage.ID_EMPRESA;
    console.log(id)
    var nome = sessionStorage.NOME_USUARIO;
    console.log(nome)
    
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
    window.location = "../login.html";
}
*/
