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

function buscarUltimasCpuporProcessos(idMaquina, limite_linhas) {
    instrucaoSql = `SELECT nome_processo, AVG(uso_cpu) as media_uso_cpu FROM processos WHERE fk_maquinaP = ${idMaquina} GROUP BY nome_processo ORDER BY media_uso_cpu DESC limit 7;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasDiscoporProcessos(idMaquina, limite_linhas) {
    instrucaoSql = `SELECT nome_processo, SUM(gravacao_disco) as total_uso_disco FROM processos WHERE fk_maquinaP = ${idMaquina} GROUP BY nome_processo ORDER BY total_uso_disco DESC limit 7;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarProcessador(idMaquina, limite_linhas) {
    instrucaoSql = `select identificador,fabricante,microarquitetura,fk_maquina_especificacao,fk_empresa_especificacao from especificacao WHERE fk_maquina_especificacao = ${idMaquina} limit 1;`;

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
    buscarMaiorUso,
    buscarUltimasCpuporProcessos,
    buscarUltimasDiscoporProcessos,
    listarProcessador
}