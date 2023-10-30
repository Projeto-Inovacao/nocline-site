// VAR PARA KPI
var KPI_CPU = document.getElementById("uso_cpu_kpi");
var KPI_RAM = document.getElementById("ram_kpi");
var KPI_DISCO = document.getElementById("disco_kpi");


// VAR PARA MUDAR O VALOR DO DESEMPENHO
var CPU = document.getElementById("porcentagem_cpu");
var RAM = document.getElementById("uso_memoria_ram");
var DISCO = document.getElementById("disco_rigido");

// VAR PARA MUDAR O TAMANHO DA BARRA DE PROGUESSO
var CPU_bar = document.getElementById("bar_porcentagem_cpu");
var RAM_bar = document.getElementById("bar_uso_memoria_ram");
var disco_bar = document.getElementById("bar_disco_rigido");

valores = [DISCO, RAM, CPU]
valores_kpi_desempenho = [KPI_DISCO, KPI_RAM, KPI_CPU]
valores_Bar = [disco_bar, RAM_bar, CPU_bar]

// window.onload = obterDadosDesempenho(idMaquina);

function obterDadosDesempenho(idMaquina) {
    console.log("Desempenho")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimasDesempenho/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoDesempenho(resposta, idMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoDesempenho(resposta, idMaquina) {
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        valores[i].innerHTML = (registro.uso) + "%";
        valores_Bar[i].style.width = (registro.uso) + "%";
        valores_kpi_desempenho[i].innerHTML = (registro.uso) + "%";
    }
    setTimeout(() => atualizarGraficoDesempenho(idMaquina), 2000);
}

function atualizarGraficoDesempenho(idMaquina) {

    fetch(`/medidas/tempo-realDesempenho/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

                valores = [CPU, RAM, DISCO]
                valores_kpi_desempenho = [KPI_CPU, KPI_RAM, KPI_DISCO]
                valores_Bar = [CPU_bar, RAM_bar, disco_bar]

                for (i = 0; i < novoRegistro.length; i++) {
                    var dados = novoRegistro[i];
                    if (valores[i] && valores_Bar[i]) {
                        valores[i].innerHTML = (dados.uso) + "%";
                        valores_Bar[i].style.width = (novoRegistro.uso) + "%";
                        valores_kpi_desempenho[i].innerHTML = (dados.uso) + "%";
                    }
                }
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenho(idMaquina), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenho(idMaquina), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function limparDesempenho() {
    for (i = 0; i <= valores.length; i++) {
        valores[i].innerHTML = "";
        valores_Bar[i].style.width = "";
        valores_kpi_desempenho[i].innerHTML = "";
    }
}