var database = require("../database/config");


function buscarMedidasEmTempoRealRede(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 1 * FROM  VW_REDE_CHARTU where fk_maquina_monitoramento= 8 order by data_hora desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHARTU
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRedeO(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 5 * FROM  VW_REDE_CHARTU where fk_maquina_monitoramento= 8 order by data_hora desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHARTU 
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else { //blz eu so queria ver se ntinha algum lugar q n tava chumbeido
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRedeU(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 4 * FROM  VW_REDE_CHARTU where fk_maquina_monitoramento= 8 order by data_hora desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHARTU
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRedeP(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT * FROM  VW_REDE_CHART where fk_maquina_monitoramento= 1 order by data_hora desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasRedeP(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select TOP 4* from VW_REDE_CHART
        where id_maquina = 1 order by data_hora desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHART
                    where id_maquina = 1
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasDesempenhoRede(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select TOP ${limite_linhas} * from VW_REDE_CHARTU
        where id_maquina = 8`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHARTU
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDesempenhoRede(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 3 * from VW_REDE_CHARTU
        where id_maquina = 8
        ORDER BY data_hora`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHARTU
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 3`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Gráfico de Pizza Rede e Processos

function buscarMedidasEmTempoRealRedeProcessos(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 * from processos
        where fk_maquinaP = ${idMaquina}
        ORDER BY data_hora`; //quita esse eh o q faz plotar ne? sim

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from processos
        where fk_maquinaP = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasRedeProcessos(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 7 pid, *
        FROM processos
        WHERE fk_maquinaP = 1 AND bytes_enviados IS NOT NULL AND bytes_recebidos IS NOT NULL;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from processos
                    where fk_maquinaP = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarProcessosRede(idMaquina, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `select * from processos
    where fk_maquinaP = ${idMaquina} AND fk_empresaP = ${idEmpresa}  order by bytes_enviados desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    buscarMedidasEmTempoRealRede,
    buscarUltimasMedidasRedeO,
    buscarMedidasEmTempoRealRedeP,
    buscarUltimasMedidasRedeP,
    buscarUltimasMedidasDesempenhoRede,
    buscarMedidasEmTempoRealDesempenhoRede,
    buscarMedidasEmTempoRealRedeProcessos,
    buscarUltimasMedidasRedeProcessos,
    listarProcessosRede,
    buscarUltimasMedidasRedeU

}
