import javax.swing.JOptionPane

class Turma {
    var nome: String = ""
    var listaAlunos = mutableListOf<Aluno>()

    fun addAlunos(
        nomeAluno: String,
        ra: String,
        contador: Int
    ) {
        for (ii in 1..contador) {
            val novoAluno = Aluno()
            novoAluno.nome = nomeAluno
            novoAluno.matricula = ra

            listaAlunos.add(novoAluno)
        }
    }

    fun exibirTurma(){
        JOptionPane.showMessageDialog(null,"""
    Nome da turma: $nome 
    Quantidade de alunos: ${listaAlunos.size}        
        """)
    }

    fun exibir3Primeiros(){
        for(i in 0..2) {
            var aluno = listaAlunos[i]
            JOptionPane.showMessageDialog(
                null, """
    Nome da Turma: $nome
    Nome do aluno: ${aluno.nome}
    Matricula: ${aluno.matricula}        
        """
            )
        }
    }
}