var database = require("../database/config");

function buscarUltimasMedidasCPU() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `   select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA`;
    
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
<<<<<<< HEAD
        instrucaoSql = `  SELECT
        AVG(usado) AS media_ram,
        setor,
        linha.nome AS nome_linha
    FROM
        VW_RAM_CHART
    JOIN maquina ON maquina.id_maquina = VW_RAM_CHART.id_maquina
    JOIN linha ON linha.id_linha = maquina.fk_linhaM
    GROUP BY
        setor, linha.nome;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        AVG(usado) AS media_ram,
        setor,
        linha.nome AS nome_linha
    FROM
        VW_RAM_CHART
    JOIN maquina ON maquina.id_maquina = VW_RAM_CHART.id_maquina
    JOIN linha ON linha.id_linha = maquina.fk_linhaM
    GROUP BY
        setor, linha.nome;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMedidasEmTempoRealCPU() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA
        ORDER BY data_hora DESC limit 1`;
=======
        instrucaoSql = `  select * from VW_MEDIA_RAM_POR_SETOR_E_LINHA`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_MEDIA_RAM_POR_SETOR_E_LINHA `;
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMedidasEmTempoRealCPU(idMaquina) {

<<<<<<< HEAD
function buscarMedidasEmTempoRealRAM() {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_MEDIA_RAM_POR_SETOR_E_LINHA
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_MEDIA_RAM_POR_SETOR_E_LINHA
=======
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_CPU_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_CPU_CHART
        where id_maquina = ${idMaquina}
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
<<<<<<< HEAD



=======
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f
module.exports = {
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealCPU,
    buscarMedidasEmTempoRealRAM


}
