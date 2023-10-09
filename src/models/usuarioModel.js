var database = require("../database/config")

// function entrar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucao = `
//     select 
//     email_corporativo, senha, emailEmpresa, senhaEmpresa from Colaborador 
//     right join Empresa on fkEmpresa = idEmpresa
//     WHERE (email_corporativo = '${email}' AND senha = '${senha}') or (emailEmpresa = '${email}' AND senhaEmpresa = '${senha}');
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa( razaoSocial, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", razaoSocial, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO empresa (razaoSocial, cnpj) VALUES ( '${razaoSocial}', '${cnpj}');`

    console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);

}
function cadastrarEndereco(cep, cnpj, pais, estado, cidade, bairro, rua, numero, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEndereco():", cep, cnpj, pais, estado, cidade, bairro, rua, numero, complemento);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO endereco ( cep, num, rua, bairro, cidade, estado, pais, complemento, fkEmpresa) VALUES ( '${cep}', ${numero}, '${rua}', '${bairro}', '${cidade}', '${estado}', '${pais}', '${complemento}', (select idEmpresa from empresa where CNPJ = '${cnpj}'));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarColaborador(nomeRepresentante, emailRepresentante, cpfRepresentante, senhaRepresentante, celularRepresentante, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarColaborador():", nomeRepresentante, emailRepresentante, cpfRepresentante, celularRepresentante, senhaRepresentante, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO colaborador (nome, cpf, email, celular, senha, fkEmpresa, fkNivelAcesso) VALUES ( '${nomeRepresentante}', '${emailRepresentante}', '${celularRepresentante}', '${cpfRepresentante}', '${senhaRepresentante}', (select idEmpresa from empresa where CNPJ = '${cnpj}'), 1);
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);

}


function cadastrarMaquina(codEmpresa, maquinaSetor, maquinaNSerie, maquinaSO, maquinaModelo, comp1, comp2, comp3, comp4) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", codEmpresa, maquinaSetor, maquinaNSerie, maquinaSO, maquinaModelo, comp1, comp2, comp3, comp4);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    // o componente n sei como fazer e o codEmpresa???????
        INSERT INTO Maquina (numeroSerie, so, modelo, setor comp1, comp2, comp3, comp4) VALUES ( '${codEmpresa}', '${maquinaSetor}', '${maquinaNSerie}', '${maquinaSO}', '${maquinaModelo}');
    `;
    var valores = [nomeRepresentante, cpfRepresentante, emailRepresentante, celularRepresentante, senhaRepresentante, cnpj];

console.log("Executando a instrução SQL: \n" + instrucao);
return database.executarComParametros(instrucao, valores);

//     console.log("Executando a instrução SQL: \n" + instrucao);
//    return database.executar(instrucao);

}

module.exports = {
    // entrar,
    cadastrarEmpresa,
    cadastrarEndereco, 
    cadastrarColaborador, 
    cadastrarMaquina
};