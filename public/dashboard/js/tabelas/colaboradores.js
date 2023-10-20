
idEmpresa = 2
function atualizarFeed() {
    fetch(`/processos/listarColab/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("body_colaboradores");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("body_colaboradores");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var colaboradores = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var celulaID = novaLinha.insertCell(0);
                    var celulaNome = novaLinha.insertCell(1);
                    var celulaSetor = novaLinha.insertCell(2);
                    var celulaEmail = novaLinha.insertCell(3);
                    var celulaCelular = novaLinha.insertCell(4);


                    celulaID.innerHTML = colaboradores.idColaborador;
                    celulaNome.innerHTML = colaboradores.nome;
                    celulaSetor.innerHTML = colaboradores.email;
                    celulaEmail.innerHTML = colaboradores.celular;
                    celulaCelular.innerHTML = colaboradores.fkNivelAcesso;

                }

               // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
       // finalizarAguardar();
    });
}