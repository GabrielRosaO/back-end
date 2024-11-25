import express from "express"
import routes from "./src/routes/postRoutes.js";

//dados ficticios pra teste
//const posts = [{
//        id: 1,
//        descricao: "foto",
//        imagem: "https://placecats.com/millie/300/150",
//    },
//    {
//        id: 2,
//        descricao: "vídeo",
//        imagem: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Link para um vídeo do YouTube
//        duracao: "2 minutos",
//    },
//    {
//        id: 3,
//        descricao: "texto",
//        conteudo: "Este é um post de texto longo e interessante.",
//    },
//    {
//        id: 4,
//        descricao: "enquete",
//        pergunta: "Qual sua cor favorita?",
//        opcoes: ["Vermelho", "Azul", "Verde"],
//    },
//    {
//        id: 5,
//        descricao: "localização",
//        coordenadas: { latitude: -23.5505, longitude: -46.6333 }, // Coordenadas de São Paulo
//        descricaoLocal: "Um lugar incrível para visitar.",
//    }
//];

//representa o servidor em uma variavel "app"
const app = express();
//ele indica que essa pasta pode ser usada por qualquer um que acesse esse servidor
app.use(express.static("uploads"))
routes(app)

//inicializa o servidor na porta 3000, ou seja, ele fica analisando tudo que ocorre na porta 3000
//eh 3000 pq eh o padrao para um servidor local 
app.listen(3000,() => {
    console.log("Server listening..");
});


//function buscarPostPorID(id){
//    //entra no array posts, e retorna o dado com o id pedido no parametro da função
//    return posts.findIndex((post) => {
//        //retorna se existe um dado com esse id
//        return post.id === Number(id);
//    });
//}
//
////vai pegar um dos dados especificos, no caso pelo id dele
//app.get("/posts/:id", (req,res) => {
//    //a requisição tem o parâmetro id que eu posso buscar, assim como outros tipos de dados
//    const index = buscarPostPorID(req.params.id);
//    //200 eh o status http, significa ok/sucesso
//    res.status(200).json(posts[index]);//resposta vai ter o status 200 e vai enviar o objeto na posição index
//});