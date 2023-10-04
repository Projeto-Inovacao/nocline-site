var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idEmpresa, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(cep, pais, estado, cidade, bairro, rua, numero, complemento, razaoSocial, cnpj, emailEmpresa, telefoneCelular, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",cep, pais, estado, cidade, bairro, rua, numero, complemento, razaoSocial, cnpj, emailEmpresa, telefoneCelular, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Endereco (idEndereco, CEP, num, rua, bairro, cidade, estado, pais, complemento) VALUES (NULL, '${cep}', ${numero}, '${rua}', '${bairro}', '${cidade}', '${estado}', '${pais}', '${complemento}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao);

    var instrucao2 = `
        INSERT INTO Empresa (idEmpresa,razaoSocial,CNPJ ) VALUES (NULL, ${razaoSocial}, '${cnpj}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao2);
    database.executar(instrucao2);

    var instrucao3 = `
        INSERT INTO Colaborador (idColaborador, nome, email_corporativo, senha, telCel) VALUES (NULL, '${nome}','${emailEmpresa}', '${senha}', '${telefoneCelular}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao3);
    return database.executar(instrucao3);
}

module.exports = {
    autenticar,
    cadastrar
};