import fs from "fs";
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js";


export async function listarTodosPosts(req,res){
    //resultado_posts vai receber o array com todos os dados da função getTodosPosts que retorna todos os dados que estão no banco de dados
    const resultado_posts = await getTodosPosts();
    //200 eh o status http, significa ok/sucesso
    res.status(200).json(resultado_posts);//resposta vai ter o status 200 e vai enviar a string salve salve
}

export async function postNovaPostagem(req, res){
    //vai pegar da requisição o body, ou detalhes, do Post
    const novoPost = req.body;
    //vai tentar acessar o post criado, esperando criar essa postagem com o metodo post
    try{
        const postCriado = await criarPost(novoPost);//tenta ciar o post
        res.status(200).json(postCriado);//retorna o novo post criado
    }catch (error){
        console.error("Problema: ", error.message);
        res.status(500).json({"Erro": "Nao rolou, deu falah na req"})
    }
}

export async function uploadImagem(req, res){
    //vai pegar da requisição o body, ou detalhes, do Post
    //template pra novos posts
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    //vai tentar acessar o post criado, esperando criar essa postagem com o metodo post
    try{
        const postCriado = await criarPost(novoPost);//tenta ciar o post
        const imgAtualizado = `uploads/${postCriado.insertedId}.png` //renomear a imagem para o id do mongo
        fs.renameSync(req.file.path, imgAtualizado);//usa a biblioteca fs pra fazer esse renome na pasta upload do projeto
        res.status(200).json(postCriado);//retorna o novo post criado
    }catch (error){
        console.error("Problema: ", error.message);
        res.status(500).json({"Erro": "Nao rolou, deu falah na req"})
    }
}

export async function atualizaNovoPost(req, res){
    //vai pegar da requisição o body, ou detalhes, do Post
    const idPost = req.params.id;
    //salva a url da imagem atualizada
    const urlImg = `http://localhost:3000/${idPost}.png`
    //vai tentar acessar o post criado, esperando criar essa postagem com o metodo post
    try{
        const imgBuffer = fs.readFileSync(`uploads/${idPost}.png`);//gera um texto da imagem 
        const descricao = await gerarDescricaoComGemini(imgBuffer);//gera uma descriçaõ pra imagem com o google gemini
         //objeto do post
        const post = { 
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }
        
        const postCriado = await atualizarPost(idPost, post);//tenta ciar o post



        res.status(200).json(postCriado);//retorna o novo post criado
    }catch (error){
        console.error("Problema: ", error.message);
        res.status(500).json({"Erro": "Nao rolou, deu falah na req"})
    }
}

