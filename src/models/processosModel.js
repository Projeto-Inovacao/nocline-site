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
    var instrucao = ` SELECT * FROM VW_JANELA_PROCESSO WHERE nome_processo LIKE '%${nome_janela}%' 
    AND status_abertura = 1
    AND id_maquina = '${idMaquina}' AND fk_empresaP = '${idEmpresa}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarProcessosJanelas(nome_janela, idMaquina, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n ");
    var instrucao = `SELECT * FROM VW_TABELA_PROCESSOS 
    WHERE nome_processo LIKE '%${nome_janela}%' 
    AND status_abertura = 1
    AND fk_maquinaP = '${idMaquina}' AND fk_empresaP = '${idEmpresa}';
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

