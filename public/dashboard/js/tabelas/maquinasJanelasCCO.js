var idEmpresa = sessionStorage.ID_EMPRESA;

function atualizarFeedJanelas() {
    fetch(`/setor/listarJanelas/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_janelas");
                var mensagem = document.createElement("div");
                mensagem.innerHTML = "Nenhum resultado encontrado.";
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("tabela_janelas");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var maquina = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var idMaquina = novaLinha.insertCell(0);
                    var hostname = novaLinha.insertCell(1);
                    var qtdJanelasAbertas = novaLinha.insertCell(2);

                    // Preenche as células com os dados da API
                    idMaquina.innerHTML = maquina.id_maquina;
                    hostname.innerHTML = maquina.hostname;
                    qtdJanelasAbertas.innerHTML = maquina.quantidade_janelas_abertas;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        var tabela_titulo_janela = document.getElementById("tabela_titulo_janela");
        tabela_titulo_janela.innerHTML = "Você não tem nenhuma janela cadastrada...";
    });
}
