var database = require("../database/config");


function buscarUltimasMedidasFrequencia(idMaquina, limite_linhas) {

   
        instrucaoSql = ` SELECT data_hora, frequencia FROM especificacao WHERE fk_maquina_especificacao = ${idMaquina} ORDER BY data_hora limit 11;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasProcessadorTemp(idMaquina, limite_linhas) {
    instrucaoSql = `SELECT data_hora, uso_cpu FROM processos WHERE fk_maquinaP = ${idMaquina} ORDER BY data_hora limit 11;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaiorUso(idMaquina) {
    instrucaoSql = `
    SELECT CONCAT(ROUND((MAX(dado_coletado) / 100) * 100), '%') AS porcentagem FROM monitoramento WHERE descricao = 'cpu individual marcos'  AND fk_maquina_monitoramento = ${idMaquina};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidasProcessadorTemp,
    buscarUltimasMedidasFrequencia, 
    buscarMaiorUso
}