// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

idEmpresa = sessionStorage.ID_EMPRESA
console.log(idEmpresa)
let pagina_atual = 1;
const resultados_por_pagina = 10;
var totalDados = 0

function atualizarFeed(idMaquina) {
    fetch(`/processos/listarJanelas/${idEmpresa}/${idMaquina}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_janela");
                var mensagem = document.createElement("div");
                mensagem.innerHTML = "Nenhum resultado encontrado.";
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (dados) {
                console.log("Dados recebidos: ", JSON.stringify(dados));
                totalDados = dados.length
                const inicio = (pagina_atual - 1) * resultados_por_pagina;
                const fim = inicio + resultados_por_pagina;
                const dados_tabela = dados.slice(inicio, fim);

                var feed = document.getElementById("tabela_janela");
                feed.innerHTML = "";
                for (let i = 0; i < dados_tabela.length; i++) {
                    var janela = dados_tabela[i];

                    var novaLinha = feed.insertRow();

                    var nome = novaLinha.insertCell(0);
                    var valor = novaLinha.insertCell(1);
                    var status = novaLinha.insertCell(2);
                    var ultimo_registro = novaLinha.insertCell(3);

                    nome.innerHTML = janela.nome_janela;
                    if (janela.valor_negocio == 1) {
                        valor.innerHTML = "Agrega";
                    } else if (janela.valor_negocio == 0) {
                        valor.innerHTML = "Não agrega";
                    } else {
                        valor.innerHTML = "Não registrado";
                    }

                    if (janela.status_abertura == 1) {
                        status.innerHTML = "Aberta";
                    } else if (janela.status_abertura == 0) {
                        status.innerHTML = "Fechada ";
                    } else {
                        status.innerHTML = "Não registrada";
                    }
                    ultimo_registro.innerHTML = janela.data_hora;
                }
                const pagina_atualElement = document.getElementById("pagina_atual");
                pagina_atualElement.textContent = `Página ${pagina_atual}`;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (error) {
        console.error(error);
    });
}

const PaginaAnteriorButton = document.getElementById("pag_anterior");
const ProximaPaginaButton = document.getElementById("prox_pagina");

PaginaAnteriorButton.addEventListener("click", function () {
    var elemento_maquina = document.getElementById("select_maquina");
    var idMaquina = elemento_maquina.value;
    if (pagina_atual > 1) {
        pagina_atual--;
        atualizarFeed(idMaquina);
    }
});

ProximaPaginaButton.addEventListener("click", function () {
    const totalPages = Math.ceil(totalDados / resultados_por_pagina);

    if (pagina_atual < totalPages) {
        var elemento_maquina = document.getElementById("select_maquina");
        var idMaquina = elemento_maquina.value;
        pagina_atual++;
        atualizarFeed(idMaquina);
    }
});

let pagina_atual_processos = 1;
const resultados_por_pagina_processos = 10;
var totalDados_processos = 0

function atualizarFeedProcessos(idEmpresa, idMaquina) {
    var elemento_maquina = document.getElementById("select_maquina");
    var idMaquina = elemento_maquina.value;
    console.log(idMaquina)

    nome_janela = input_nome_janela.value
    console.log(nome_janela)

    idEmpresa = sessionStorage.ID_EMPRESA
    console.log(idEmpresa)

    fetch(`/processos/listarProcessosJanelas/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome_janelaServer: nome_janela,
            idMaquinaServer: idMaquina,
            idEmpresaServer: idEmpresa
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_janela_processo");
                var mensagem = document.createElement("div");
                mensagem.innerHTML = "Nenhum resultado encontrado.";
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (dados) {
                console.log("Dados recebidos: ", JSON.stringify(dados));
                totalDados_processos = dados.length
                const inicio = (pagina_atual_processos - 1) * resultados_por_pagina_processos;
                const fim = inicio + resultados_por_pagina_processos;
                const dados_tabela = dados.slice(inicio, fim);

                var feed = document.getElementById("tabela_janela_processo");
                feed.innerHTML = "";
                for (let i = 0; i < dados_tabela.length; i++) {
                    var processo = dados_tabela[i];

                    // PID	Nome do processo	Uso de CPU (%)	Uso de RAM (%)	Quantidade de tempo em atividade
                    var novaLinha = feed.insertRow();

                    var pid = novaLinha.insertCell(0);
                    var nome_processo = novaLinha.insertCell(1);
                    var uso_ram = novaLinha.insertCell(2);
                    // var tempo_atividade = novaLinha.insertCell(3);

                    pid.innerHTML = processo.pid
                    nome_processo.innerHTML = processo.nome_processo
                    uso_ram.innerHTML = processo.uso_memoria
                    // tempo_atividade.innerHTML = processo.tempo_atividade
                }
                carregarFeedGraficos()
                const pagina_atual_processosElement = document.getElementById("pagina_atual_processos");
                pagina_atual_processosElement.textContent = `Página ${pagina_atual_processos}`;

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (error) {
        console.error(error);
    });
}

const PaginaAnteriorProcessosButton = document.getElementById("pag_anterior_processos");
const ProximaPaginaProcessosButton = document.getElementById("prox_pagina_processos");

PaginaAnteriorProcessosButton.addEventListener("click", function () {
    var elemento_maquina = document.getElementById("select_maquina");
    var idMaquina = elemento_maquina.value;
    if (pagina_atual_processos > 1) {
        pagina_atual_processos--;
        atualizarFeedProcessos(idEmpresa, idMaquina); 
    }
});

ProximaPaginaProcessosButton.addEventListener("click", function () {
    const totalPages = Math.ceil(totalDados_processos / resultados_por_pagina_processos);

    if (pagina_atual_processos < totalPages) {
        var elemento_maquina = document.getElementById("select_maquina");
        var idMaquina = elemento_maquina.value;
        pagina_atual_processos++;
        atualizarFeedProcessos(idEmpresa, idMaquina);
    }
});

function carregarFeedGraficos() {
    var elemento_maquina = document.getElementById("select_maquina");
    var idMaquina = elemento_maquina.value;
    console.log(idMaquina)

    nome_janela = input_nome_janela.value
    console.log(nome_janela)

    idEmpresa = sessionStorage.ID_EMPRESA
    console.log(idEmpresa)

    fetch(`/processos/BuscarDadosProcessos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome_janelaServer: nome_janela,
            idMaquinaServer: idMaquina,
            idEmpresaServer: idEmpresa
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("graficos");
                var mensagem = document.createElement("div");
                mensagem.innerHTML = "Nenhum resultado encontrado.";
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
              var feed = document.getElementById("graficos");
              feed.innerHTML = ""
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                const dadosAgrupadosPorPID = resposta.reduce((acc, obj) => {
                    const pid = obj.pid;
                    if (!acc[pid]) {
                        acc[pid] = [];
                    }
                    acc[pid].push(obj);
                    return acc;
                }, {});

                Object.keys(dadosAgrupadosPorPID).forEach(pid => {
                    // Criar elemento canvas para o gráfico
                    const canvasElement = document.createElement('canvas');
                    canvasElement.id = `myChart_${pid}`;
                    canvasElement.style.height = '100%';
                    canvasElement.style.width = '100%';
                
                    // Criar a div com a classe chart-area e adicionar o canvas
                    const chartAreaDiv = document.createElement('div');
                    chartAreaDiv.className = 'chart-area';
                    chartAreaDiv.appendChild(canvasElement);
                
                    // Criar a div do card
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'col-xl-6 col-lg-7';
                    cardDiv.style.marginLeft = '2px';
                    cardDiv.style.width = '568px';
                    cardDiv.style.height = '500px';
                
                    // Criar a div do card-shadow
                    const cardShadowDiv = document.createElement('div');
                    cardShadowDiv.className = 'card shadow mb-4';
                    cardShadowDiv.style.width = '100%';
                    cardShadowDiv.style.height = '100%';
                    cardShadowDiv.style.marginLeft = '2px';
                
                    // Criar a div do card-header
                    const cardHeaderDiv = document.createElement('div');
                    cardHeaderDiv.className = 'card-header py-3';
                
                    // Criar o elemento h6 para o título do card-header
                    const h6Element = document.createElement('h6');
                    h6Element.className = 'm-0 font-weight-bold text-primary-dash';
                    h6Element.textContent = `PID ${pid}`;
                
                    // Adicionar o h6 ao card-header
                    cardHeaderDiv.appendChild(h6Element);
                
                    // Criar a div do card-body e adicionar a chart-area
                    const cardBodyDiv = document.createElement('div');
                    cardBodyDiv.className = 'card-body';
                    cardBodyDiv.appendChild(chartAreaDiv);
                
                    // Criar a div para os círculos no final do card
                    const mt4Div = document.createElement('div');
                    mt4Div.className = 'mt-4 text-center small';
                    mt4Div.style.height = '40px';
                    mt4Div.style.marginTop = '-2%';
                
                    // Adicionar os círculos à div
                    // (Note que os estilos e ícones são fixos, você pode ajustar conforme necessário)
                    const circles = [
                        { color: '#00FF00', iconClass: 'fas fa-circle' },
                        { color: '#f6ff00', iconClass: 'fas fa-circle' },
                        { color: '#FF0000', iconClass: 'fa fa-circle' }
                    ];
                
                    circles.forEach(circle => {
                        const span = document.createElement('span');
                        span.className = 'mr-2';
                        const icon = document.createElement('i');
                        icon.className = circle.iconClass;
                        icon.style.fontSize = '14px';
                        icon.style.color = circle.color;
                        span.appendChild(icon);
                        mt4Div.appendChild(span);
                    });
                
                    // Adicionar todas as partes ao card-shadow
                    cardShadowDiv.appendChild(cardHeaderDiv);
                    cardShadowDiv.appendChild(cardBodyDiv);
                    cardShadowDiv.appendChild(mt4Div);
                
                    // Adicionar o card-shadow à div do card
                    cardDiv.appendChild(cardShadowDiv);
                
                    // Adicionar a div do card à div com o ID "graficos"
                    document.getElementById('graficos').appendChild(cardDiv);
                
                    // Chamar a função para obter os dados do gráfico
                    plotarGraficoProcesso(pid, dadosAgrupadosPorPID[pid]);
                });
                

                finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function plotarGraficoProcesso(pid, resposta) {

    console.log('iniciando plotagem do gráfico...');
    console.log(pid)
    console.log(resposta)
  
    // Criando estrutura para plotar gráfico - labels
    let labels = [];
  
    // Criando estrutura para plotar gráfico - dados
    let dados = {
      labels: labels,
      datasets: [{
        label: 'Uso (%) Da Maquina',
        data: [],
        backgroundColor: [],
        borderColor: ['#393d42'],
        tension: 0.1,
        fill: false,
        pointRadius: 6
      },
      {
        label: 'Uso (%) Do processo',
        data: [],
        backgroundColor: [],
        borderColor: ['#c6c6c6'],
        tension: 0.1,
        fill: false,
        pointRadius: 6
      },
      ]
    };
  
    console.log('----------------------------------------------')
    console.log(`-------------------PLOT ${pid} ---------------------`)
    console.log(resposta)
  
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = resposta.length - 1; i >= 0; i--) {
      var registro = resposta[i];
      dados.datasets[0].data.push(registro.uso_memoria_total);
      dados.datasets[1].data.push(registro.uso_memoria);
      labels.push(registro.data_hora);
  
      // Definindo a cor com base nas condições
      if (registro.uso_memoria_total < 88) {
        dados.datasets[0].backgroundColor.push('#00FF00');
      } else if (registro.uso_memoria_total <= 80) {
        dados.datasets[0].backgroundColor.push('#f6ff00');
      } else {
        dados.datasets[0].backgroundColor.push('#FF0000');
      }
  
      
        dados.datasets[1].backgroundColor.push('#c6c6c6');
      
    
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
  
    console.log(document.getElementById(`myChart_${pid}`))
    // Adicionando gráfico criado em div na tela
    let chart = new Chart(
      document.getElementById(`myChart_${pid}`),
      config
    );
  
    // setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRede), 5000);
  }
  
  
  function atualizarGraficoRede(idMaquina, dados, chartRede) {
  
    fetch(`/medidas/tempo-realRede/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
  
          // obterDadosCPU(idMaquina);
          // // alertar(novoRegistro, idMaquina);
          // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          // console.log(`Dados atuais do gráfico:`);
          // console.log(dados);
  
          if (novoRegistro[0].data_hora == dados.datasets[0].data.data_hora) {
            console.log("---------------------------------------------------------------")
            console.log("Como não há dados novos para captura, o gráfico não atualizará.")
            // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
            console.log("Horário do novo dado capturado:")
            console.log(novoRegistro[0].data_hora)
            console.log("Horário do último dado capturado:")
            console.log(dados.labels[dados.labels.length - 1])
            console.log("---------------------------------------------------------------")
          } else {
            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].data_hora); // incluir um novo momento
  
            dados.datasets[0].data.shift();  // apagar o primeira medida
            dados.datasets[0].data.push(novoRegistro[0].usado); // incluir uma nova medida
  
            dados.datasets[1].data.shift();  // apagar o primeira medida
            dados.datasets[1].data.push(novoRegistro[0].livre); // incluir uma nova medida
  
            if (novoRegistro.enviados != null) {
              KPI_BYTE_ENVIADOS.innerHTML = novoRegistro.enviados
            }
            if (novoRegistro.recebidos != null) {
              KPI_BYTE_RECEBIDOS.innerHTML = novoRegistro.recebidos
            }
  
            chartRede.update();
          }
  
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacaoRede = setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRede), 5000);
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacaoRede = setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRede), 5000);
      }
    })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  
  }
  
  function limparRede() {
    let chartRede = new Chart(
      document.getElementById(`myAreaChartRede`),
    );
  
    chartRede.clear()
  }