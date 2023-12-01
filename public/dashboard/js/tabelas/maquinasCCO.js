idEmpresa = sessionStorage.ID_EMPRESA;

function atualizarFeed() {
    fetch(`/setor/listarMaquinas/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_maquinas");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                t_maquinas = 0
                t_maquinas_perigo = 0
                t_maquinas_risco = 0
                qtd_avisos_mes = 0

                var feed = document.getElementById("tabela_maquinas");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var maquina = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var id = novaLinha.insertCell(0);
                    var ip = novaLinha.insertCell(1);
                    var hostname = novaLinha.insertCell(2);
                    var so = novaLinha.insertCell(3);
                    var modelo = novaLinha.insertCell(4);
                    var setor = novaLinha.insertCell(5);
                    var status = novaLinha.insertCell(6);
                    var qtd_alertas_maquina = novaLinha.insertCell(7);
                    var linhas = novaLinha.insertCell(8);

                    id.innerHTML = "<b><span style='color: black;'>" + maquina.id_maquina + "</span></b>";
                    ip.innerHTML = "<b><span style='color: black;'>" + maquina.ip + "</span></b>";
                    hostname.innerHTML = "<b><span style='color: black;'>" + maquina.hostname + "</span></b>";
                    so.innerHTML = "<b><span style='color: black;'>" + maquina.so + "</span></b>";
                    modelo.innerHTML = "<b><span style='color: black;'>" + maquina.modelo + "</span></b>";
                    setor.innerHTML = "<b><span style='color: black;'>" + maquina.setor + "</span></b>";
                    
                    
                    // Adiciona cor ao status com base na quantidade de alertas
                    if (maquina.qtd_alerta_maquina === 0) {
                        status.innerHTML = "<b><span style='color: black;'>" + "Ativa" + "</span></b>";
                        id.style.backgroundColor = " #90ee90";  // Verde para normal
                    } else if (maquina.qtd_alerta_maquina < 5) {
                        status.innerHTML = "<b><span style='color: black;'>" + "Preocupante" + "</span></b>"
                        id.style.backgroundColor = "#F0E68C";  // Amarelo para preocupante
                    } else {
                        status.innerHTML = "<b><span style='color: black;'>" + "Critico" + "</span></b>";
                        id.style.backgroundColor = "#FA8072";  // Vermelho para crítico
                    }

                    qtd_alertas_maquina.innerHTML = "<b><span style='color: black;'>" + maquina.qtd_alerta_maquina + "</span></b>";
                    linhas.innerHTML = "<b><span style='color: black;'>" + maquina.nome_linha + "</span></b>";
                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        tabela_titulo_maquina.innerHTML = "Você não tem nenhuma maquina cadastrada...";
    });
}
