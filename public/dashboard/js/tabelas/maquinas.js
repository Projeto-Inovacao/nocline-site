idEmpresa = sessionStorage.ID_EMPRESA;

function atualizarFeed() {
    fetch(`/empresas/listarMaquinas/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_maquinas");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

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
                    var monitoramento = novaLinha.insertCell(6);


                    id.innerHTML = maquina.id_maquina;
                    ip.innerHTML = maquina.ip;
                    hostname.innerHTML = maquina.hostname;
                    so.innerHTML = maquina.so;
                    modelo.innerHTML = maquina.modelo;
                    setor.innerHTML = maquina.setor;
                    monitoramento.innerHTML = "OK";

                }

               // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        tabela_titulo_maquina.innerHTML = "Você não tem nenhuma maquina cadastrada..."
    });
}