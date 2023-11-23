fun main(){

    val turma1 = Turma()
    turma1.nome = "1SIS"
    turma1.addAlunos("John Doe", "03231099", 50)

    turma1.exibirTurma()
    turma1.exibir3Primeiros()

    val turma2 = Turma()
    turma2.nome = "2SIS"
    turma2.addAlunos("Guilherme", "03231037", 35)

    turma2.exibirTurma()
    turma2.exibir3Primeiros()
}