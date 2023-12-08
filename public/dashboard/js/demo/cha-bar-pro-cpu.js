// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


function ObtergraficoBarra(idMaquina) {
    console.log("Uso CPU por processo")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }
  
    fetch(`/processador/cpuporprocesso/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
  
                plotarGraficoPizza(resposta, idMaquina);
  
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
  }
  


function plotarGraficoPizza(resposta, idMaquina) {
    var ctxBarChart = document.getElementById("myChartCpuXPro");

    var titulos = [];

    var dados = {
        labels: titulos,
        datasets: [{
            label: 'Grafico',
            data: [],
            fill: true,
            backgroundColor: [      
              '#2510a3', 'rgb(54, 162, 235)', 
              '#338dff', '#191970' , '#6495ED', '#483D8B',
              '#000080' , '#4169E1', '#4682B4', '#87CEFA' ]
        }]
    };

    for (var i = 0;i<resposta.length;i++){
        var dado = resposta[i];

        titulos.push(dado.nome_processo)

        dados.datasets[0].data.push(dado.media_uso_cpu)

    }

    const config = {
        type: 'bar',
        data: dados,
        option: {
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                }
              },
              y: {
                ticks: {
                  min: 0,
                  max: 15000,
                  maxTicksLimit: 5,
                  callback: function(value, index, values) {
                    return '$' + number_format(value);
                  }
                },
                grid: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2]
                }
              },
            },
            legend: {
              display: false
            },
            tooltips: {
              // ...
            },
          }
    }

    var myBarChart = new Chart(
        ctxBarChart,
        config
    );

}