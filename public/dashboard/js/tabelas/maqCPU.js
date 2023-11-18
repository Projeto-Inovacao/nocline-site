idEmpresa = sessionStorage.ID_EMPRESA;

function atualizarFeedCPU(idMaquina) {
    fetch(`/empresas/listarMaqCPU/${idEmpresa}/${idMaquina}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("cpu_coluna");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                // t_maquinas = 0
                // t_maquinas_perigo = 0
                // t_maquinas_risco = 0
                // qtd_avisos_mes = 0

                var feed = document.getElementById("cpu_coluna");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var listaCPU = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();
                  
                    

                    // Cria células para cada coluna
                    var dado = novaLinha.insertCell(0);

                    dado.innerHTML = listaCPU.dado_coletado;
                    // if(maquina.status_maquina == 1){
                    //     status.innerHTML = "Ativa"
                    // }else if (maquina.status_maquina == 0){
                    //     status.innerHTML = "Inativa"
                    // }
                    // qtd_alertas_maquina.innerHTML = maquina.qtd_alerta_maquina;
                    
                    // console.log(maquina.qtd_maquina)
                    // t_maquinas += maquina.qtd_maquina
                    // console.log(t_maquinas)
                    // t_maquinas_perigo += maquina.qtd_perigo
                    // t_maquinas_risco += maquina.qtd_risco
                    // qtd_avisos_mes += maquina.qtd_alertas_no_mes

                    // total_maquinas.innerHTML = t_maquinas;
                    // total_maquinas_perigo.innerHTML = t_maquinas_perigo;
                    // total_maquinas_risco.innerHTML = t_maquinas_risco;
                    // avisos_mes.innerHTML = qtd_avisos_mes;
                }

                atualizarFeedCPU(idMaquina)
               // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        tabela_titulo_maquina.innerHTML = "Você não tem nenhuma maquina cadastrada..."
    });
}