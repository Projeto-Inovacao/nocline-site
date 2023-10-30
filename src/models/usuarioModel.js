var database = require("../database/config")

    //select 
    //* from colaborador 
    //join empresa on fk_empresa = id_empresa
    //WHERE (email = '${email}' AND senha = sha('${senha}',256)) ;/
function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    select 
    colaborador.*, empresa.cnpj, 
    DATE_FORMAT(contrato.data_inicio, "%d/%m/%Y") as data_inicio, 
    DATE_FORMAT(contrato.data_termino, "%d/%m/%Y") as data_termino, 
    empresa.razao_social,
    plano.nome_plano, 
    contrato.preco_total 
    from colaborador 
     join empresa on fk_empresa = id_empresa
     left join contrato on fk_empresaCo = id_empresa
     left join plano on fk_plano = id_plano
    WHERE (email = '${email}' AND senha = '${senha}') ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function cadastrarEmpresa(razaoSocial, cnpj) {
    console.log("ACESSEI O USUARIO MODEL EMPRESA \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", razaoSocial, cnpj);

    var instrucao = `
    INSERT INTO empresa (razao_social, cnpj) VALUES ( '${razaoSocial}', '${cnpj}');`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrarEndereco(cep, numero, rua, bairro, cidade, estado, pais, complemento, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEndereco():", cep, cnpj, pais, estado, cidade, bairro, rua, numero, complemento);

    var instrucao = `
        INSERT INTO endereco ( cep, num, rua, bairro, cidade, estado, pais, complemento, fk_empresaE) VALUES ( '${cep}', ${numero}, '${rua}', '${bairro}', '${cidade}', '${estado}', '${pais}', '${complemento}', (select id_empresa from empresa where cnpj = '${cnpj}'));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarColaborador(nomeRepresentante, cpfRepresentante, emailRepresentante, celularRepresentante, senhaRepresentante, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", nomeRepresentante, emailRepresentante, cpfRepresentante, celularRepresentante, senhaRepresentante, cnpj);

    var instrucao = `
        INSERT INTO colaborador (nome, cpf, email, celular, senha, fk_empresa, fk_nivel_acesso) VALUES ( '${nomeRepresentante}', '${cpfRepresentante}','${emailRepresentante}', '${celularRepresentante}',  '${senhaRepresentante}', (select id_empresa from empresa where cnpj = '${cnpj}'), 1);
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrarColaborador1(nome,cpf, email, senha, celular, codigo, setor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", nome,cpf, email, senha, celular, codigo, setor);

    var instrucao = `
        INSERT INTO colaborador (nome, cpf, email, celular, senha, fk_empresa, fk_nivel_acesso) VALUES ( '${nome}', '${cpf}','${email}', '${celular}',  '${senha}', (select id_empresa from empresa where id_empresa = '${codigo}'), (select id_nivel_acesso from nivel_acesso where sigla = '${setor}'));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrarMaquina(codEmpresa, setor, so, modelo, ip, hostname) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEndereco():",     //  e na ordem de inserção dos dados.
    );

    var instrucao = `
    INSERT INTO maquina (ip, so, hostname, modelo, setor, fk_empresaM) VALUES ( '${ip}', '${so}', '${hostname}', '${modelo}', '${setor}', ${codEmpresa});

    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarMaquina(codEmpresa, id, so, ip, hostname, modelo, setor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():");

    var instrucao = `
    UPDATE maquina set ip = '${ip}', so = '${so}', hostname = '${hostname}', setor = '${setor}', modelo = '${modelo}' where fk_empresaM = ${codEmpresa} and id_maquina = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function excluirMaquina(idEmpresa, idMaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", idEmpresa, idMaquina);

    var instrucao = `
    DELETE FROM maquina where id_maquina= '${idMaquina}' and fk_empresaM = ${idEmpresa}; 
        `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function alterarColaborador(id, email, celular, senha, setor, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", id, email, celular, senha, setor);

    var instrucao = `
        UPDATE colaborador SET email = '${email}', celular = '${celular}', senha = '${senha}', fk_nivel_acesso= (select id_nivel_acesso from nivel_acesso where sigla = '${setor}') where id_colaborador = '${id}' and (select id_empresa from empresa where id_empresa = '${codigo}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function excluirColaborador(id, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", id, codigo);

    var instrucao = `
    DELETE FROM colaborador where id_colaborador= '${id}' and (select id_empresa from empresa where id_empresa = '${codigo}'); 
        `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}



module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarColaborador,
    cadastrarMaquina, 
    excluirMaquina,
    alterarMaquina,
    cadastrarColaborador1, 
    alterarColaborador, 
    excluirColaborador
};