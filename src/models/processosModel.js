var database = require("../database/config");

function listarProcessos(idMaquina, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n ");
    var instrucao = `select * from processos
    where fk_maquinaP = ${idMaquina} AND fk_empresaP = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarJanelas(idMaquina, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n ");

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select nome_janela, FORMAT(janela.data_hora, '%Y-%MM-%d %H:%m:%s') as data_hora, status_abertura, valor_negocio from janela
        where fk_maquinaJ = ${idMaquina} AND fk_empresaJ = ${idEmpresa};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select nome_janela, DATE_FORMAT(janela.data_hora, "%Y-%m-%d %H:%i:%s") as data_hora, status_abertura, valor_negocio from janela
        where fk_maquinaJ = ${idMaquina} AND fk_empresaJ = ${idEmpresa};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function BuscarDadosProcessos(nome_janela, idMaquina, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n ");
    var instrucao = `SELECT
    p.pid,
    p.nome_processo,
    ROUND(p.uso_memoria, 2) AS uso_memoria,
    p.status_abertura,
    p.fk_maquinaP,
    p.fk_empresaP,
    FORMAT(p.data_hora, '%d/%M/%y %H:%m:%s') as data_hora,
    t.usado AS uso_memoria_total
FROM
    processos p
JOIN
    VW_RAM_CHART_KT t ON p.fk_maquinaP = t.id_maquina
WHERE
    p.nome_processo LIKE '%${nome_janela}%' AND fk_maquinaP = ${idMaquina} AND fk_empresaP = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarProcessosJanelas(nome_janela, idMaquina, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n ");
    var instrucao = `SELECT
    pid,
    nome_processo,
    ROUND(uso_cpu, 2) AS uso_cpu,
    ROUND(uso_memoria, 2) AS uso_memoria,
    status_abertura,
    fk_maquinaP,
    fk_empresaP,
    data_hora,
    DATEDIFF(DAY, data_hora, GETDATE()) AS tempo_atividade
FROM (
    SELECT
        p.pid,
        p.nome_processo,
        p.uso_cpu,
        p.uso_memoria,
        p.status_abertura,
        p.fk_maquinaP,
        p.fk_empresaP,
        p.data_hora,
        ROW_NUMBER() OVER (PARTITION BY p.pid ORDER BY p.data_hora DESC) AS RowNum
    FROM
        processos p
) AS Ranked WHERE nome_processo LIKE '%${nome_janela}%' AND status_abertura = 1 AND fk_maquinaP = ${idMaquina} AND fk_empresaP = ${idEmpresa} AND RowNum = 1
	;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarJanelasDistintas(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n ");
    var instrucao = `select distinct(nome_janela) from janela where fk_empresaJ = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarJanela(codEmpresa, nome_janela, valor_negocio) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n ");
    var instrucao = `
        UPDATE janela
        JOIN (SELECT id_janela FROM janela WHERE nome_janela = '${nome_janela}' AND fk_empresaJ = ${codEmpresa}) AS id_janelas
        SET valor_negocio = ${valor_negocio}
        WHERE janela.id_janela = id_janelas.id_janela;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos,
    listarJanelas,
    listarJanelasDistintas,
    alterarJanela,
    listarProcessosJanelas,
    BuscarDadosProcessos
}

