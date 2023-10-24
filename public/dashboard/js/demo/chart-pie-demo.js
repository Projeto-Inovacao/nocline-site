// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var idMaquina = 1
// Pie Chart Example    
var ctx = document.getElementById("myPieChart");

window.onload = obterDadosDisco(idMaquina);

function obterDadosDisco(idMaquina) {
  console.log("DISCO!")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/ultimasDisco/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoDisco(resposta, idMaquina);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoDisco(resposta, idMaquina) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = ["Livre","Usado"];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Livre',
      data: [],
      backgroundColor: ['rgba(0, 185, 185)', 'rgba(185, 11, 0)'],
      borderColor: ['rgba(0, 185, 185)','rgba(185, 11, 0)'],
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

  setTimeout(() => atualizarGraficoDisco(idMaquina, dados, chartDisco), 5000);
}
function atualizarGraficoDisco(idMaquina, dados, chartDisco) {

  fetch(`/medidas/tempo-realDisco/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        // obterDadosCPU(idMaquina);
        // alertar(novoRegistro, idMaquina);
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);

        if ((novoRegistro[0].livre == dados.datasets[0].data.livre) && (novoRegistro[0].usado == dados.datasets[0].data.usado)) {
          console.log("---------------------------------------------------------------")
          console.log("Como não houve mudança de armazenamento no disco, o gráfico não atualizará.")
          // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].data_hora)
          console.log("Horário do último dado capturado:")
          console.log(dados.labels[dados.labels.length - 1])
          console.log("---------------------------------------------------------------")
        } else {
          dados.datasets[0].data.pop();
          dados.datasets[0].data.pop();

          dados.datasets[0].data.push(novoRegistro[0].livre); // incluir uma nova medida
          dados.datasets[0].data.push(novoRegistro[0].usado); // incluir uma nova medida

          chartDisco.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacaoDisco = setTimeout(() => atualizarGraficoDisco(idMaquina, dados, chartDisco), 10000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacaoDisco = setTimeout(() => atualizarGraficoDisco(idMaquina, dados, chartDisco), 10000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}