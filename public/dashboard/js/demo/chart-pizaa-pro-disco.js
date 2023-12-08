// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';



function obtergraficoPizza(idMaquina) {
    console.log("Uso CPU por processo")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }
  
    fetch(`/processador/cpupordisco/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
  
                plotarGraficodisco(resposta, idMaquina);
  
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
  }
  




function plotarGraficodisco(resposta,idMaquina) {
    var ctxBarChart = document.getElementById("myChartDiscoXPro");

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
                '#000080' , '#4169E1', '#4682B4', '#87CEFA' ],
                borderColor: [],
                tension: 0.1,
                hoverOffset: 4
        }]
    };

    for (var i = 0;i<resposta.length;i++){
        var dado = resposta[i];

        titulos.push(dado.nome_processo)

        dados.datasets[0].data.push(dado.total_uso_disco)

    }

    const config = {
        type: 'doughnut',
        data: dados
        }

    var myBarChart = new Chart(
        ctxBarChart,
        config
    );
}
