var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    select 
    * from colaborador 
     join empresa on fkEmpresa = idEmpresa
    WHERE (email = '${email}' AND senha = '${senha}') ;
    `;
    // var instrucao2=`SELECT c.fkEmpresa AS idEmpresa
    // FROM colaborador c
    // WHERE c.email = '${email}';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    // console.log("Executando a instrução SQL2: \n" + instrucao2);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(razaoSocial, cnpj) {
    console.log("ACESSEI O USUARIO MODEL EMPRESA \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", razaoSocial, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO empresa (razaoSocial, cnpj) VALUES ( '${razaoSocial}', '${cnpj}');`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrarEndereco(cep, numero, rua, bairro, cidade, estado, pais, complemento, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEndereco():", cep, cnpj, pais, estado, cidade, bairro, rua, numero, complemento);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO endereco ( cep, num, rua, bairro, cidade, estado, pais, complemento, fkEmpresaE) VALUES ( '${cep}', ${numero}, '${rua}', '${bairro}', '${cidade}', '${estado}', '${pais}', '${complemento}', (select idEmpresa from empresa where CNPJ = '${cnpj}'));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarColaborador(nomeRepresentante, cpfRepresentante, emailRepresentante, celularRepresentante, senhaRepresentante, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", nomeRepresentante, emailRepresentante, cpfRepresentante, celularRepresentante, senhaRepresentante, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO colaborador (nome, cpf, email, celular, senha, fkEmpresa, fkNivelAcesso) VALUES ( '${nomeRepresentante}', '${cpfRepresentante}','${emailRepresentante}', '${celularRepresentante}',  '${senhaRepresentante}', (select idEmpresa from empresa where CNPJ = '${cnpj}'), 1);
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrarColaborador1(nome,cpf, email, senha, celular, codigo, setor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", nome,cpf, email, senha, celular, codigo, setor);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO colaborador (nome, cpf, email, celular, senha, fkEmpresa, fkNivelAcesso) VALUES ( '${nome}', '${cpf}','${email}', '${celular}',  '${senha}', (select idEmpresa from empresa where idEmpresa = '${codigo}'), (select idNivelAcesso from NivelAcesso where sigla = '${setor}'));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrarCartao(nCartao, validade, cvv, bandeira, nomeTitular, cnpj, plano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEndereco():", cnpj, plano, nCartao, nomeTitular, validade, cvv, bandeira);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    UPDATE empresa SET fkPlano = ${plano} WHERE CNPJ = ${cnpj};   
    `;

    var instrucao2 = `
    INSERT INTO cartao (nCartao, validade, cvv, bandeira, nomeTitular, fkEmpresaC) VALUES ( '${nCartao}', '${validade}', '${cvv}', '${bandeira}', '${nomeTitular}', (select idEmpresa from empresa WHERE CNPJ = '${cnpj}'));

    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Executando a instrução SQL: \n" + instrucao2);
    database.executar(instrucao);
    return database.executar(instrucao2);
}

function cadastrarMaquina(maquinaIPMVar, maquinaSOMVar, maquinaModeloMVar, maquinaSetorMVar, codEmpresaMVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEndereco():",     //  e na ordem de inserção dos dados.
    );

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    // var instrucao = `
    // UPDATE empresa SET fkPlano = ${plano} WHERE CNPJ = ${cnpj};   
    // `;

    var instrucao3 = `
    INSERT INTO maquina (ip, so, hostname, modelo, setor, fkEmpresa) VALUES ( '${maquinaIPMVar}', '${maquinaSOMVar}', 'host', '${maquinaModeloMVar}', '${maquinaSetorMVar}', '${codEmpresaMVar}');

    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Executando a instrução SQL: \n" + instrucao3);
    // database.executar(instrucao);
    return database.executar(instrucao3);
}

function alterarColaborador(id, email, celular, senha, setor, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", id, email, celular, senha, setor);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        UPDATE colaborador SET email = '${email}', celular = '${celular}', senha = '${senha}', fkNivelAcesso= (select idNivelAcesso from NivelAcesso where sigla = '${setor}') where idColaborador = '${id}' and (select idEmpresa from empresa where idEmpresa = '${codigo}');
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
    cadastrarCartao,
    cadastrarColaborador1, 
    alterarColaborador
};