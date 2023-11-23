import javax.swing.JOptionPane

fun main(){

    val autor1: Autor = Autor()
    autor1.nome = "George"
    autor1.idade = 75
    autor1.adicionarLivro("Game Of Thrones",1996,autor1)

    autor1.listarDescricao()

    val autor2: Autor = Autor()
    autor2.nome = " C. J. Tudor"
    autor2.adicionarLivro("Homem de Giz",2018,autor2)

    autor2.listarDescricao()

    val autor3: Autor = Autor()
    autor3.nome = "J. K. Rowling"
    autor3.adicionarLivro("Harry Potter e a Pedra Filosofal",1997,autor3)
    autor3.adicionarLivro("Harry Potter e a Câmara Secreta",1998,autor3)
    autor3.adicionarLivro("Harry Potter e o Prisioneiro de Azkaban",1999,autor3)

    autor3.listarDescricao()

    autor1.livraria.clear()

    autor1.listarDescricao()

    JOptionPane.showMessageDialog(null,"Autor: ${autor1.nome}\r\n" +
            "Idade: ${autor1.idade} anos")
}