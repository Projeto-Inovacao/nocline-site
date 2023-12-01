// Supondo que você já tenha a ID da empresa disponível em sessionStorage
var idEmpresa = sessionStorage.ID_EMPRESA;

function atualizarFeedJanelas() {
    fetch(`/setor/listarJanelas/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_janelas");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("tabela_janelas");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var janela = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var idJanela = novaLinha.insertCell(0);
                    var nomeJanela = novaLinha.insertCell(1);
                    var statusAbertura = novaLinha.insertCell(2);
                    var dataHora = novaLinha.insertCell(3);

                    idJanela.innerHTML = janela.id_janela;
                    nomeJanela.innerHTML = janela.nome_janela;
                    statusAbertura.innerHTML = janela.status_abertura ? "Aberta" : "Fechada";
                    dataHora.innerHTML = janela.ultima_medida_data_hora;

                    // Adicione mais colunas conforme necessário

                    // Aqui você pode realizar outras operações com os dados
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        tabela_titulo_janela.innerHTML = "Você não tem nenhuma janela cadastrada..."
    });
}


