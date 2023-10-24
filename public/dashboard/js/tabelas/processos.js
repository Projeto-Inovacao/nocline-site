idMaquina = 1 
idEmpresa = 1
function atualizarFeed() {
    fetch(`/processos/listar/${idEmpresa}/${idMaquina}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("body_processo");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("body_processo");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var processo = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var PID = novaLinha.insertCell(0);
                    var UsoCPU = novaLinha.insertCell(1);
                    var UsoMemoria = novaLinha.insertCell(2);
                    var UsoMemoriaSwap = novaLinha.insertCell(3);


                    PID.innerHTML = processo.pid;
                    UsoCPU.innerHTML = processo.uso_cpu;
                    UsoMemoria.innerHTML = processo.uso_memoria;
                    UsoMemoriaSwap.innerHTML = processo.memoria_virtual;

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