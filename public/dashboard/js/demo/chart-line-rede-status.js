// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// VAR PARA KPI
var KPI_PING = document.getElementById("PING_KPI");
var KPI_LAT = document.getElementById("lat_kpi");

var ping = document.getElementById("ping");
var lat = document.getElementById("lat");

var elemento_maquina = document.getElementById("select_maquina");
var idMaquina = elemento_maquina.value;

// window.onload = obterDadosRede(idMaquina);

function obterDadosRedeO(idMaquina) {
  console.log("REDE")

  valores_kpi = [KPI_LAT, KPI_PING]
  valores = [ping, lat]

  fetch(`/rede/ultimasREDE/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos DE REDE: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoRedeO(resposta, idMaquina);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoRedeO(resposta, idMaquina) {
  console.log('Iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Status da Rede',
      data: [],
      backgroundColor: [],
      borderColor: ['#393d42'],
      tension: 0.1,
      fill: false,
      pointRadius: 6
    },
    {
      label: 'Latência',
      data: [],
      backgroundColor: [],
      borderColor: ['#c6c6c6'],
      tension: 0.1,
      fill: false,
      pointRadius: 6
    },
    ]
  };

  console.log('--------------------------------------------------------------------')
  console.log('-------------------PLOT REDE Status e Latênci---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico

  console.log('Dados recebidos pela função plotarGraficoRedeO:');
  console.log(resposta);

  // Inserindo valores recebidos em estrutura para plotar o gráfico

  for (let i = resposta.length - 1; i >= 0; i--) {
    var registro = resposta[i];
    var xxx = [registro.ping, registro.latencia]
    dados.datasets[0].data.push(registro.ping);
    dados.datasets[1].data.push(registro.latencia);
    labels.push(registro.data_hora);

    
    document.getElementById("PING_KPI").innerHTML = registro.ping + " ms"

    // Definindo a cor com base nas condições
    if (registro.ping < 7.00) {
      dados.datasets[0].backgroundColor.push('#00FF00');
    } else if (registro.ping <= 10) {
      dados.datasets[0].backgroundColor.push('#f6ff00');
    } else {
      dados.datasets[0].backgroundColor.push('#FF0000');
    }
    // Definindo a cor com base nas condições
    if (registro.latencia < 81.05) {
      dados.datasets[1].backgroundColor.push('#00FF00');
    } else if (registro.latencia <= 176.45) {
      dados.datasets[1].backgroundColor.push('#f6ff00');
    } else {
      dados.datasets[1].backgroundColor.push('#FF0000');
    }
  }
  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Reverter a ordem dos arrays antes de criar o gráfico
  labels.reverse();
  dados.datasets[0].data.reverse();
  dados.datasets[1].data.reverse();

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'line',
    data: dados,
    options: {
      scales: {
        y: {
          beginAtZero: false // Define para não começar em zero
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    },
    fill: false
  }

  // Adicionando gráfico criado em div na tela
  let chartRedeO = new Chart(
    document.getElementById(`myAreaChartRedeO`),
    config
  );

  setTimeout(() => atualizarGraficoRedeO(idMaquina, dados, chartRedeO), 10000);
}

function atualizarGraficoRedeO(idMaquina, dados, chartRedeO) {
  fetch(`/rede/tempo-realRede/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {
        novoRegistro.reverse();

        console.log("---------------------------------------------------------------");
        console.log("Como não há dados novos para captura, o gráfico não atualizará.");
        console.log("Horário do novo dado capturado:");
        console.log(novoRegistro[0].data_hora);
        console.log("Horário do último dado capturado:");
        console.log(dados.labels[dados.labels.length - 1]);
        console.log("---------------------------------------------------------------");

        dados.labels.shift();
        dados.labels.push(novoRegistro[0].data_hora);

        dados.datasets[0].data.shift();
        dados.datasets[0].data.push(novoRegistro[0].ping);

        dados.datasets[1].data.shift();
        dados.datasets[1].data.push(novoRegistro[0].latencia);

        chartRedeO.update();
      });
    }
  });
}

function limparRede() {
  let chartRedeO = new Chart(
    document.getElementById(`myAreaChartRedeO`),
  );

  chartRedeO.clear();
}
