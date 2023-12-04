// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Adicionando gráfico criado em div na tela
let chartRAM;

function obterDadosRAM(idEmpresa) {
    console.log("RAM")
    console.log(idEmpresa)

    fetch(`/setor/ultimasSetorRAM/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoRAM(resposta, idEmpresa);
            
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoRAM(resposta, idEmpresa) {
    console.log('iniciando plotagem do gráfico...');

    // Ordenar os dados pelo campo 'nome_linha'
    resposta.sort((b, a) => a.nome_linha.localeCompare(b.nome_linha));

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Usada',
            data: [],
            backgroundColor: [],
            borderColor: ['#393d42'],
            tension: 0.3,
            fill: false,
            pointRadius: 6
        }]
    };

    console.log('----------------------------------------------');
    console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
    console.log(resposta);

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (let i = 0; i < resposta.length; i++) {
        let registro = resposta[i];

        // Adicionar a linha no mesmo índice no gráfico de RAM
        labels.push(registro.nome_linha);

        // Adicionando valores recebidos em estrutura para plotar o gráfico
        dados.datasets[0].data.push(registro.media_ram);
        document.getElementById("ram_kpi_setor").innerHTML = registro.ultima_medida_hora
        // Definindo a cor com base nas condições
        if (registro.media_ram <= 80) {
            dados.datasets[0].backgroundColor.push('#00FF00');
        } else if (registro.media_ram <= 90) {
            dados.datasets[0].backgroundColor.push('#f6ff00');
        } else {
            dados.datasets[0].backgroundColor.push('#FF0000');
        }
    }




    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')
  
    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        fill: true
    }

    // Destrói o gráfico existente, se houver, antes de criar um novo
    if (chartRAM) {
        chartRAM.destroy();
    }
  
    // Adicionando gráfico criado em div na tela
    chartRAM = new Chart(
        document.getElementById(`myAreaChartSetorRAM`),
        config
    );

    // Define a próxima atualização
    proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(idEmpresa, dados, chartRAM), 30000);
}

function atualizarGraficoRAM(idEmpresa, dados, chartRAM) {
    fetch(`/setor/tempo-realRAM/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                obterDadosRAM(idEmpresa);

                if (novoRegistro[0].media_ram == dados.datasets[0].data.media_ram) {
                    console.log("---------------------------------------------------------------");
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.");
                    console.log("Horário do novo dado capturado:");
                    console.log(novoRegistro[0].media_ram);
                    console.log("Horário do último dado capturado:");
                    console.log(dados.labels[dados.labels.length - 1]);
                    console.log("---------------------------------------------------------------");
                } else {
                    // Tirando e colocando valores no gráfico
                    dados.datasets[0].data.pop();  // Apagar o primeiro valor
                    dados.datasets[0].data.push(novoRegistro[0].dado_coletado); // Incluir uma nova medida
                    chartRAM.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(idEmpresa, dados, chartRAM), 30000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(idEmpresa, dados, chartRAM), 30000);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Limpa o gráfico
function limparRAM() {
    // Verifica se o gráfico já existe e o destrói antes de criar um novo
    if (chartRAM) {
        chartRAM.destroy();
    }

    // Cria um novo gráfico
    chartRAM = new Chart(document.getElementById(`myAreaChartSetorRAM`), config);
}

// Chamada inicial para obter dados e plotar o gráfico
obterDadosRAM(seuIdEmpresa); // Substitua seuIdEmpresa pelo valor desejado
