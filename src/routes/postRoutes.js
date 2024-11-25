import express from "express";
import multer from "multer";//pacote que lida com transferencia de arquivos 
import cors from "cors"
import { listarTodosPosts, postNovaPostagem, uploadImagem, atualizaNovoPost} from "../controllers/postsController.js";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
}

//Configurações de arquivos do windows(APENAS WINDOWS ESSA FUNÇÃO)
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
})

//inicialização de uma variavel pra utilizar esse pacote
const upload = multer({dest: "./uploads", storage})
//linux ou mac usa  - const upload = multer({dest: "./uploads"})

const routes = (app) => {
    //maneira que o servidor vai transportar os dados, nesse caso esse servidor vai enviar e receber jsons
    app.use(express.json());
    app.use(cors(corsOptions))

    //Rota pra buscar os posts
    //quando tiver uma conexão na porta 3000 nessa rota /posts ele acessa. Isso no caso é uma pagina do site todo
    app.get("/posts", listarTodosPosts);

    //Rota pra criar um post
    app.post("/posts", postNovaPostagem)

    //vai fazer o upload da imagem usando esse multer, ai pra avisar que vai usar ele coloca antes da função que vai chamar o controlador
    app.post("/upload", upload.single("imagemGatitos"), uploadImagem)

    //rota pra atualiar dados
    app.put("/upload/:id", atualizaNovoPost)
}

export default routes;