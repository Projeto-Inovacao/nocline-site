// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var idMaquina = 1
// var ctx = document.getElementById("myAreaChartCPU");

window.onload = obterDadosRAM(idMaquina);

function obterDadosRAM(idMaquina) {
    console.log("RAM")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/ultimasRAM/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGraficoRAM(resposta, idMaquina);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoRAM(resposta, idMaquina) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
      labels: labels,
      datasets: [{
          label: 'usado',
          data: [],
          backgroundColor: ['rgba(220, 11, 11)'],
          borderColor: ['rgba(255, 123, 123)'],
          tension: 0.1,
          fill: false
      },
      {
        label: 'livre',
        data: [],
        backgroundColor: ['rgba(42, 178, 3)'],
        borderColor: ['rgba(149, 255, 123)'],
        tension: 0.1,
        fill: false
    },
  ]
  };

  console.log('----------------------------------------------')
  console.log('-------------------PLOT RAM---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      dados.datasets[0].data.push(registro.livre);
      dados.datasets[1].data.push(registro.usado);
      labels.push(registro.dtHora);
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
    type: 'line',
    data: dados,
    fill: false
  }
  
  // Adicionando gráfico criado em div na tela
  let chartRAM= new Chart(
      document.getElementById(`myAreaChartRAM`),
      config
  );

  // setTimeout(() => atualizarGrafico(idMaquina, dados, chartDisco), 2000);
}