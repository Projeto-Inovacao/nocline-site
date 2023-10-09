function cadastrarEmpresa(){
    console.log("Entrei na funcao")
    
    var razaoSocial = input_razao_social.value;
    var cnpj = input_cnpj.value;
    
    // if (razaoSocial=="" || cnpj == "" ){
    //   alert("Há campos que não foram preenchidos");
    // } else {
    //     if (cnpj.length > 14 || cnpj.length < 14){
    //         alert("O CNPJ deve conter 14 dígitos")
    //     }}
    
    fetch("/usuarios/cadastrarEmpresa", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
    
            razaoSocialServer: razaoSocial,
            cnpjServer: cnpj
    
          })
      }).then(function (resposta) {
    
        console.log("resposta: ", resposta);
    
        if (resposta.ok) {
            console.log("cadastrei empresa")
    
              } else {
                  throw ("Houve um erro ao tentar realizar o cadastro!");
              }
          }).catch(function (resposta) {
              console.log(`#ERRO: ${resposta}`);
    
          });
    
          return false;
      }
    
      function cadastrarColaborador(){
        console.log("Entrei na funcao")
    
        var cnpj = input_cnpj.value;
        var nomeRepresentante = input_nome_rep.value;
        var emailRepresentante = input_email_rep.value;
        var celularRepresentante = input_cel_rep.value;
        var cpfRepresentante = input_cpf_rep.value;
        var senhaRepresentante = input_senha_rep.value;
        console.log(senhaRepresentante)
        var confirmaSenha = input_confirma_senha.value;
    
        // if (nomeRepresentante =="" || emailRepresentante == "" || celularRepresentante == "" || cpfRepresentante == "" || senhaRepresentante == "" || confirmaSenha == ""){
        //   alert("Há campos que não foram preenchidos");
        // } else {
        //     if (emailRepresentante.indexOf('@') < 0){
        //         alert("O email precisa conter @")
        //     }
        //     if(celularRepresentante.length > 11 || celularRepresentante.length < 11){
        //         alert("O celular precisa conter 11 caracteres")
        //     }
        //     if (cpfRepresentante.length > 11 || cpfRepresentante.length < 11 ){
        //         alert("O CPF precisa conter 11 caracteres")
        //     }
        //     if(confirmaSenha != senhaRepresentante){
        //         alert("As senhas inseridas não estão iguais")
        //     }
    
        //     }
    
            fetch("/usuarios/cadastrarColaborador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
    
                      nomeRepresentanteServer: nomeRepresentante, 
                      emailRepresentanteServer : emailRepresentante,
                      celularRepresentanteServer : celularRepresentante,
                      cpfRepresentanteServer : cpfRepresentante,
                      senhaRepresentanteServer : senhaRepresentante,
                      cnpjServer: cnpj
    
                    })
                }).then(function (resposta) {
    
                  console.log("resposta: ", resposta);
    
                  if (resposta.ok) {
                      console.log("cadastrei empresa")
    
                        } else {
                            throw ("Houve um erro ao tentar realizar o cadastro!");
                        }
                    }).catch(function (resposta) {
                        console.log(`#ERRO: ${resposta}`);
    
                    });
    
                    return false;
    
    
        }
    
    
      function cadastrarEndereco() {
          console.log("Entrei na funcao endereco")
    
          //Recupere o valor da nova input pelo nome do id
          // Agora vá para o método fetch logo abaixo
          var cnpj = input_cnpj.value;
          var cep = input_cep.value;
          var pais = input_pais.value;
          var estado = input_estado.value;
          var cidade = input_cidade.value;
          var bairro = input_bairro.value;
          var rua = input_rua.value;
          var numero = input_numero.value;
          var complemento = input_complemento.value;
    
    
    
    // if (cep == "" || pais == "" || estado == "" || cidade == "" || bairro == "" || rua == "" || numero == "" ) {
    //     alert("Há campos que não foram preenchidos");
    // } else{
    //     if (cep.length > 8 || cep.length < 8){
    //         alert("CEP precisa ter 8 caracteres")
    //     }
    // }
    
    fetch("/usuarios/cadastrarEndereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              cnpjServer: cnpj,
              cepServer: cep,
              paisServer: pais,
              estadoServer: estado,
              cidadeServer: cidade,
              bairroServer: bairro,
              ruaServer: rua,
              numeroServer: numero,
              complementoServer: complemento
    
          })
    }).then(function (resposta) {
    
        console.log("resposta: ", resposta);
    
        if (resposta.ok) {
          console.log("cadastrou com sucesso")
    
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    
    });
    
    return false;
    }

     
    function cadastrarCartao() {
        console.log("Entrei na funcao endereco")
  
        //Recupere o valor da nova input pelo nome do id
        // Agora vá para o método fetch logo abaixo
        var cnpj = input_cnpj.value;
        var plano = document.getElementById("input_plano").selectedIndex
        // var plano = input_plano.value;
        console.log(plano)
        var nCartao = input_numero_cartao.value;
        var nomeTitular = input_nome_titular.value;
        var validade = input_validade.value;
        var cvv = input_cvv.value;
        var bandeira = input_bandeira.value;
    
  
  // if (cep == "" || pais == "" || estado == "" || cidade == "" || bairro == "" || rua == "" || numero == "" ) {
  //     alert("Há campos que não foram preenchidos");
  // } else{
  //     if (cep.length > 8 || cep.length < 8){
  //         alert("CEP precisa ter 8 caracteres")
  //     }
  // }
  
  fetch("/usuarios/cadastrarCartao", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cnpjServer: cnpj,
            planoServer : plano,
            nCartaoServer : nCartao,
            nomeTitularServer : nomeTitular,
            validadeServer : validade, 
            cvvServer : cvv,
            bandeiraServer : bandeira 
      
        })
  }).then(function (resposta) {
  
      console.log("resposta: ", resposta);
  
      if (resposta.ok) {
        console.log("cadastrou com sucesso")
  
      } else {
          throw ("Houve um erro ao tentar realizar o cadastro!");
      }
  }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
  
  });
  
  return false;
  }