function validarSessao() {
    var id = sessionStorage.ID_EMPRESA;
    var nome = sessionStorage.NOME_USUARIO;
    var nivel_acesso = sessionStorage.NIVEL_ACESSO;
    console.log(id)
    console.log(nome)
    console.log(nivel_acesso)
   
    if (nivel_acesso == 3) {
        const cco1 = document.getElementById("cadastro_colab")
        const cco2 = document.getElementById("atualizar_colab")
        cco1.style.display = "none"
        cco2.style.display= "none"
    } 
    else if (nivel_acesso == 2) {
        const cco1 = document.getElementById("cadastro_colab")
        const cco2 = document.getElementById("atualizar_colab")
        cco1.style.display = "none"
        cco2.style.display= "none"
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
    } else {
        window.location = "../login.html";
    }
}

function exibirMaquinas() {
    select = document.getElementById("select_maquina");
    JSON.parse(sessionStorage.MAQUINAS).forEach(item => {
        var opcao = document.createElement('option');
        opcao.value = item.id_maquina;
        opcao.innerHTML = "Maquina ID: " + item.id_maquina;
        select.appendChild(opcao);
    });
}

function exibirPerfil(){
    var ni = ""

    if(sessionStorage.NIVEL_ACESSO == 3){
        ni = "CCO | Centro de Controle Operacional"
    } else if (sessionStorage.NIVEL_ACESSO == 2){
        ni = "SSO | Sala de Supervisão Opercional"
    } else if (sessionStorage.NIVEL_ACESSO == 1){
        ni = "RLP | Representante Legal"
    }
    
    i_usuario.innerHTML = sessionStorage.ID_USUARIO;
    no_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    e_usuario.innerHTML = sessionStorage.EMAIL_USUARIO;
    c_usuario.innerHTML = sessionStorage.CELULAR_USUARIO;
    s_usuario.innerHTML = sessionStorage.SENHA_USUARIO;
    ni_usuario.innerHTML = ni

    // EMPRESA
    n_empresa.innerHTML = sessionStorage.NOME_EMPRESA;
    c_empresa.innerHTML = sessionStorage.CNPJ_EMPRESA
    b_usuario.innerHTML = sessionStorage.ID_EMPRESA;
}
/*
function limparSessao() {
    sessionStorage.clear();
}
*/
