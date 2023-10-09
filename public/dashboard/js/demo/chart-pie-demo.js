// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var idMaquina = 1
console.log("teste!")
// Pie Chart Example    
var ctx = document.getElementById("myPieChart");
window.onload = obterDadosGrafico(idMaquina);
function obterDadosGrafico(idMaquina) {
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/ultimasDisco/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGrafico(resposta, idMaquina);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGrafico(resposta, idMaquina) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = ["Usado", "Livre"];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
      labels: labels,
      datasets: [{
          label: 'Livre',
          data: [],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(199, 52, 52, 0.6)'],
          borderColor: ['rgb(75, 192, 192)', 'rgb(199, 52, 52)'],
          tension: 0.1
      },
      {
          label: 'Usado',
          data: []
      }]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      dados.datasets[0].data.push(registro.livre);
      dados.datasets[0].data.push(registro.usado);
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
    type: 'doughnut',
    data: dados
  };

  const options = {
  maintainAspectRatio: false,
  tooltips: {
    backgroundColor: "rgb(255,255,255)",
    bodyFontColor: "#858796",
    borderColor: '#dddfeb',
    borderWidth: 1,
    xPadding: 15,
    yPadding: 15,
    displayColors: false,
    caretPadding: 10,
  },
  legend: {
    display: false // Aqui você já está ocultando as legendas
  },
  cutoutPercentage: 80,
}
  
  // Adicionando gráfico criado em div na tela
  let chartDisco = new Chart(
      document.getElementById(`myPieChart`),
      config,
      options
  );

  // setTimeout(() => atualizarGrafico(idMaquina, dados, chartDisco), 2000);
}