var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    select 
    email_corporativo, senha, emailEmpresa, senhaEmpresa from Colaborador 
    right join Empresa on fkEmpresa = idEmpresa
    WHERE (email_corporativo = '${email}' AND senha = '${senha}') or (emailEmpresa = '${email}' AND senhaEmpresa = '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa( razaoSocial, cnpj, emailEmpresa, celularEmpresa, senhaEmpresa, cpfRepresentante) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", razaoSocial, cnpj, emailEmpresa, celularEmpresa, senhaEmpresa, cpfRepresentante);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Empresa (razaoSocial, cnpj, emailEmpresa, celularEmpresa, senhaEmpresa, cpfRepresentante) VALUES ( '${razaoSocial}', '${cnpj}', '${emailEmpresa}', '${celularEmpresa}', '${senhaEmpresa}', '${cpfRepresentante}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);

}
function cadastrarEndereco(cep, cnpj, pais, estado, cidade, bairro, rua, numero, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEndereco():",cep, pais, estado, cidade, bairro, rua, numero, complemento, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Endereco ( cep, num, rua, bairro, cidade, estado, pais, complemento, fkEmpresa) VALUES ( '${cep}', ${numero}, '${rua}', '${bairro}', '${cidade}', '${estado}', '${pais}', '${complemento}', (select idEmpresa from Empresa where CNPJ = '${cnpj}'));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);


}

module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarEndereco
};