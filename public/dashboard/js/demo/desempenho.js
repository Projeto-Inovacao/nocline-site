var idMaquina = 1

// VAR PARA MUDAR O VALOR DO DESEMPENHO
var redePacote = document.getElementById("myAreaChartRede");
var CPU = document.getElementById("myAreaChartRede");
var DISCO = document.getElementById("myAreaChartRede");
var RAM = document.getElementById("myAreaChartRede");

// VAR PARA MUDAR O TAMANHO DA BARRA DE PROGUESSO
var rede_bar = document.getElementById("myAreaChartRede");
var CPU_bar = document.getElementById("myAreaChartRede");
var disco_bar = document.getElementById("myAreaChartRede");
var RAM_bar = document.getElementById("myAreaChartRede");

window.onload = obterDadosDesempenho(idMaquina);

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

  // setTimeout(() => atualizarGrafico(idMaquina, dados, chartDisco), 2000);
}