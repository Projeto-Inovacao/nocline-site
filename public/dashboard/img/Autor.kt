import javax.swing.JOptionPane

class Autor {
    var nome: String = ""
    var idade: Int = 0

    val livraria = mutableListOf<Livro>()

    fun adicionarLivro(
        titulo: String,
        anoPublicacao: Int,
        autor: Autor
    ) {

        val novoLivro = Livro()
        novoLivro.titulo = titulo
        novoLivro.anoPublicacao = anoPublicacao
        novoLivro.autor = autor

        livraria.add(novoLivro)
    }

    fun exibirDescricao(livro: Livro){
        JOptionPane.showMessageDialog(null, """
        Título do Livro: ${livro.titulo}
        Ano: ${livro.anoPublicacao}
        Autor: ${livro.autor.nome}  
        """)
    }

    fun listarDescricao(){
        livraria.forEach{exibirDescricao(it)}
    }
}