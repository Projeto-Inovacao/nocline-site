var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
}

function listarFuncionario(idEmpresa) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select id_colaborador as id, nome, email, status_colaborador, fk_empresa, celular, sigla as setor from colaborador join nivel_acesso on fk_nivel_acesso = id_nivel_acesso where fk_empresa = ${idEmpresa} AND fk_nivel_acesso != 1;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
  
}

function listarFuncionarioPorId(idEmpresa, idColaborador) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select id_colaborador as id, nome, email, fk_empresa, celular, sigla as setor, status_colaborador from colaborador join nivel_acesso on fk_nivel_acesso = id_nivel_acesso where fk_empresa = ${idEmpresa} and id_colaborador = ${idColaborador};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMaquinas(idEmpresa) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from VW_ALERTAS_TABLE where fk_empresaM = ${idEmpresa} order by qtd_alerta_maquina desc;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMaquinasPorId(idEmpresa, idMaquina) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from maquina where fk_empresaM = ${idEmpresa} and id_maquina = ${idMaquina}
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarLinhasPorId(idEmpresa, idLinha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from linha where fk_empresaL = ${idEmpresa} and id_linha = ${idLinha}
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarMaquinasPorEmpresa(id) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from VW_ALERTAS_TABLE where fk_empresaM = ${id} order by qtd_alerta_maquina desc
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarLinhasPorEmpresa() {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from linha;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


function listarMaqTemp(idEmpresa, idMaquina) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
 
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = ` SELECT TOP 5
      maquina.id_maquina, 
      FORMAT(monitoramento.data_hora, 'dd/MM HH:mm') as data_hora,
      ROUND(monitoramento.dado_coletado, 2) as dado_coletado
    FROM 
      maquina 
    JOIN 
      monitoramento ON maquina.id_maquina = monitoramento.fk_maquina_monitoramento
    WHERE 
      maquina.fk_empresaM = ${idEmpresa}
      AND maquina.id_maquina = ${idMaquina}
      AND monitoramento.descricao = 'temperatura cpu'
      AND monitoramento.dado_coletado > 46.0
    ORDER BY 
      monitoramento.data_hora DESC;
     `
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = ` SELECT 
      maquina.id_maquina, 
      DATE_FORMAT(monitoramento.data_hora, '%d/%m %H:%i') as data_hora,
      monitoramento.dado_coletado 
    FROM 
      maquina 
    JOIN 
      monitoramento ON maquina.id_maquina = monitoramento.fk_maquina_monitoramento
    WHERE 
      maquina.fk_empresaM = ${idEmpresa}
      AND maquina.id_maquina = ${idMaquina}
      AND monitoramento.descricao = 'temperatura cpu'
      AND monitoramento.dado_coletado > 50.0
    ORDER BY 
      monitoramento.data_hora DESC 
    LIMIT 5;`
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function listarMaqCPU(idEmpresa, idMaquina) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT TOP 5
        maquina.id_maquina, 
        FORMAT(monitoramento.data_hora, 'dd/MM HH:mm') as data_hora,
        ROUND(monitoramento.dado_coletado, 2) as dado_coletado
      FROM 
        maquina 
      JOIN 
        monitoramento ON maquina.id_maquina = monitoramento.fk_maquina_monitoramento
      WHERE 
        maquina.fk_empresaM = ${idEmpresa}
        AND maquina.id_maquina = ${idMaquina}
        AND monitoramento.descricao = 'uso de cpu kt'
        AND monitoramento.dado_coletado > 8.0
      ORDER BY 
        monitoramento.data_hora DESC;
       `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  SELECT 
        maquina.id_maquina, 
        DATE_FORMAT(monitoramento.data_hora, '%d/%m %H:%i') as data_hora,
        ROUND(monitoramento.dado_coletado, 2) as dado_coletado
      FROM 
        maquina 
      JOIN 
        monitoramento ON maquina.id_maquina = monitoramento.fk_maquina_monitoramento
      WHERE 
        maquina.fk_empresaM = ${idEmpresa}
        AND maquina.id_maquina = ${idMaquina}
        AND monitoramento.descricao = 'uso de cpu kt'
        AND monitoramento.dado_coletado > 40.0
      ORDER BY 
        monitoramento.data_hora DESC 
      LIMIT 5;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
  
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarMaqPorLinha() {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `SELECT
  l.id_linha,
  l.nome AS nome_linha,
  l.numero AS numero_linha,
  COUNT(m.id_maquina) AS quantidade_maquinas
FROM
  linha l
LEFT JOIN
  maquina m ON l.id_linha = m.fk_linhaM
GROUP BY
  l.id_linha, l.nome, l.numero;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  listarFuncionario,
  listarFuncionarioPorId,
  listarLinhasPorId,
  listarMaquinas,
  listarMaquinasPorId,
  buscarLinhasPorEmpresa,
  buscarMaquinasPorEmpresa,
  listarMaqTemp, 
  listarMaqCPU,
  listarMaqPorLinha
};
