function validarSessao() {
    var id = sessionStorage.ID_EMPRESA;
    var nome = sessionStorage.NOME_USUARIO;
    var nivel_acesso = sessionStorage.NIVEL_ACESSO;
    console.log(id)
    console.log(nome)
    console.log(nivel_acesso)
    console.log("SKFHJSDJSADGFHJVDGHJKFGVSAHDJGFHJDSGFHJGSDHJFGHJDSGFHJGDSHJFGHJSDGFHJDGSHJFGSDHJFGHJDSGFHJSDGHFJGSDHJFGHJSDGFHJSDGFHJGSDHJFGHJDSGFHJGDSHJFGHJSDGFHJDSGHFJGSDHFGDHSJGFHJDGSFHJGSDHJFGHJDSGFHDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")

    if (nivel_acesso = 3) {
        const cco1 = document.getElementById("cadastro_colab")
        const cco2 = document.getElementById("atualizar_colab")
        cco1.style.display = "none"
        cco2.style.display= "none"
        console.log(cco1)
        console.log(cco2)
    } 
    else if (nivel_acesso = 2) {
        const sso1 = document.getElementById("cadastro_maq")
        const sso2 = document.getElementById("atualizar_maq")
        sso1.style.display = "none"
        sso2.style.display = "none"
    } 

    if (id != null && nome != null) {
        var b_usuario = document.getElementById("b_usuario")
        var n_usuario = document.getElementById("n_usuario");

        b_usuario.innerHTML = id;
        n_usuario.innerHTML = nome;
        console.log(b_usuario)
        console.log(n_usuario)
    } else {
        window.location = "../login.html";
    }
}
/*
function limparSessao() {
    sessionStorage.clear();
}
*/
