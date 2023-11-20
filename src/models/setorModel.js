var database = require("../database/config");

function buscarUltimasMedidasCPU(id_maquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA$`;
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
        instrucaoSql = `  select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM

}
// function buscarMedidasEmTempoRealCPU(idMaquina) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select * from VW_CPU_CHART
//         where id_maquina = ${idMaquina}
//         ORDER BY data_hora DESC limit 1`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select * from VW_CPU_CHART
//         where id_maquina = ${idMaquina}
//         ORDER BY data_hora DESC limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function buscarMedidasEmTempoRealRAM(idMaquina) {
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select * from VW_RAM_CHART
//         where id_maquina = ${idMaquina}
//         ORDER BY data_hora DESC limit 1`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select * from VW_RAM_CHART
//         where id_maquina = ${idMaquina}
//         ORDER BY data_hora DESC limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function buscarMedidasEmTempoRealRAM(idMaquina) {
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select * from VW_RAM_CHART
//         where id_maquina = ${idMaquina}
//         ORDER BY data_hora DESC limit 1`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select * from VW_RAM_CHART
//         where id_maquina = ${idMaquina}
//         ORDER BY data_hora DESC limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

