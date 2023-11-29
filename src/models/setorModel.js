var database = require("../database/config");

function buscarUltimasMedidasCPU() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select * from VW_MEDIA_CPU_POR_LINHA_CCO;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `   select * from VW_MEDIA_CPU_POR_LINHA_CCO;`;
    
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
        instrucaoSql = ` select *from  VW_MEDIA_RAM_POR_LINHA_CCO ;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` select *from  VW_MEDIA_RAM_POR_LINHA_CCO ;`;
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
        ORDER BY  setor DESC limit 5;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_MEDIA_CPU_POR_SETOR_E_LINHA
        ORDER BY  setor DESC limit 5;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM() {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select *from  VW_MEDIA_RAM_POR_LINHA_CCO 
        ORDER BY  setor DESC limit 5;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select *from  VW_MEDIA_RAM_POR_LINHA_CCO S
        ORDER BY  setor DESC limit 5;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarMaquinas(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `select * from VW_ALERTAS_TABLE where fk_empresaM = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
// function UltimoHorario() {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `  SELECT ultima_medida_hora
//         FROM VW_MEDIA_CPU_POR_LINHA_CCO
//         ORDER BY ultima_medida_hora DESC
//         LIMIT 1;`;
//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `   SELECT ultima_medida_hora
//         FROM VW_MEDIA_CPU_POR_LINHA_CCO
//         ORDER BY ultima_medida_hora DESC
//         LIMIT 1;;`;
    
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealCPU,
    buscarMedidasEmTempoRealRAM,
    listarMaquinas
    // ,
    // UltimoHorario

}
