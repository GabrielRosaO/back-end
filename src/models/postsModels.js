import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

//Conexão ao banco
const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);
//Função assncrona pra acesso ao mongoDB
export async function getTodosPosts(){
    const db = conexao.db("Imersao_alura_instaalgo");//acessa o db
    const colecao = db.collection("posts");//pega tudo que tiver na coleção "posts"
    return colecao.find().toArray();
}

export async function criarPost(novoPost){
    const db = conexao.db("Imersao_alura_instaalgo");//acessa o db
    const colecao = db.collection("posts");//pega tudo que tiver na coleção "posts"
    return colecao.insertOne(novoPost); //insere um novo post no bd
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db("Imersao_alura_instaalgo");//acessa o db
    const colecao = db.collection("posts");//pega tudo que tiver na coleção "posts"
    const objectId = ObjectId.createFromHexString(id);//guarda o id do post que quer atualizar  
    return colecao.updateOne({_id:new ObjectId(objectId)}, {$set: novoPost}); //insere um novo post no bd
}