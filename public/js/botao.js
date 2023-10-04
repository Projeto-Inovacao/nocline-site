// Função pra redirecionar pras paginas..
function home() {
  window.location = 'index.html'
}

function login() {
  var token = input_token.value
  var senha = input_senha.value

  if (token != '' && senha != '') {
    Swal.fire({ icon: 'success', title: 'Login realizado com sucesso!' })
  } else {
    Swal.fire({ icon: 'error', title: 'Login inválido!' })
  }
}

// function cadastrar() {


//   // if (razao_social != '' && cnpj != '' && email != '' && senha != '') {
//   //   Swal.fire({ icon: 'success', title: 'Cadastro realizado com sucesso!' })
//   // } else {
//   //   Swal.fire({ icon: 'error', title: 'Cadastro inválido!' })
//   // }

  
//         //Recupere o valor da nova input pelo nome do id
//         // Agora vá para o método fetch logo abaixo
//         var cep = input_cep.value;
//         var pais = input_pais.value;
//         var estado = input_estado.value;
//         var cidade = input_cidade.value;
//         var bairro = input_bairro.value;
//         var rua = input_rua.value;
//         var numero = input_numero.value;
//         var complemento = input_complemento.value;
//         // var nome = input_nome.value;


//         var razaoSocial = input_razao_social.value
//         var cnpj = input_cnpj.value;
//         var emailEmpresa = input_email.value;
//         var telefoneCelular = input_tel_cel.value;
//         var senha = input_senha.value;
//         var confirmaSenha = input_confirma_senha.value;


//         if (cep == "" || pais == "" || estado == "" || cidade == "" || bairro == "" || rua == "" || numero == "" || complemento == "" || razaoSocial || cnpj == "" || emailEmpresa == "" || telefoneCelular == "" || senha == "" || confirmaSenha == ""||nome=="") {
          
//             // mensagem_erro.innerHTML = "(Há campos que não foram preenchidos)";

          
//             return false;

//         } else {
//             setInterval(sumirMensagem, 5000);
//         }

//         // Validação do email para saber se tem @
//         if (emailEmpresa.indexOf('@') >= 0) {
//             setInterval(sumirMensagem, 5000)
//         } else {
           
//             // mensagem_erro.innerHTML = "Email inválido! Falta @";
          
//             return false;
//         }
//         // Validação de senha para saber se ela tem no mínimo 7 digítos
//         if (senha.length > 6) {
//             setInterval(sumirMensagem, 5000)
//         } else {
          
//             // mensagem_erro.innerHTML = "Senha inválida! Mínimo de 7 Digítos";
         
//             return false;
//         }
//         // Validação de senha para saber se elas são iguais
//         if (confirmaSenha == senha) {
//             setInterval(sumirMensagem, 5000)
//         } else {
      
//             // mensagem_erro.innerHTML = "As senhas não coincidem!";
           
//             return false;
//         }


//         // Validação de CNPJ para saber se ele possui
//         if (cnpj.length > 17) {
//             setInterval(sumirMensagem, 7000)
//         } else {
           
//             // mensagem_erro.innerHTML = "CNPJ inválido! CNPJ é composto por 18 Caracteres, exemplo: 12.345.678/0001-00";
          
//             return false;
//         }

//         // Validação de CEP para saber se ele possui 9 caracteres
//         if (cep.length > 8) {
//             setInterval(sumirMensagem, 5000)
//         } else {
            
//             // mensagem_erro.innerHTML = "CEP inválido!  CEP é composto por  9 Caracteres, exemplo: 01001-000";
           
//             return false;
//         }

//         // Enviando o valor da nova input
//         fetch("/usuarios/cadastrar", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 // crie um atributo que recebe o valor recuperado aqui
//                 // Agora vá para o arquivo routes/usuario.js
//                 cepServer: cep,
//                 paisServer: pais,
//                 estadoServer: estado,
//                 cidadeServer: cidade,
//                 bairroServer: bairro,
//                 ruaServer: rua,
//                 numeroServer: numero,
//                 complementoServer: complemento,
//                 razaoSocialServer: razaoSocial,
//                 cnpjServer: cnpj,
//                 emailEmpresaServer: emailEmpresa,
//                 telefoneCelularServer: telefoneCelular,
//                 senhaServer: senha,
//                 confirmaSenhaServer: confirmaSenha,
//                 nomeServer: nome,

  
                
//             })
//         }).then(function (resposta) {

//             console.log("resposta: ", resposta);

//             if (resposta.ok) {
              

//                 // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

//                 // setTimeout(() => {
//                 //     window.location = "login.html";
//                 // }, "2000")

               
//             } else {
//                 throw ("Houve um erro ao tentar realizar o cadastro!");
//             }
//         }).catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
          
//         });

//         return false;
//     }

    // function sumirMensagem() {
    //     cardErro.style.display = "none"
    // }

    

