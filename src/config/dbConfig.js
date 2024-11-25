//basicamente esse eh um cod pronto que eles deram que vai fazer a conexão com o banco de dados do MOngoDB
//parece q ele n muda mt 

import { MongoClient } from "mongodb";
import { convertToObject } from "typescript";

export default async function conectarAoBanco(stringConexao){
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando no banco .......");
        await mongoClient.connect();
        console.log("Conectou !!!!!")

        return mongoClient;
    }catch (error){
        console.log("Não conseguiu conectar :(", error);
        process.exit();
    }
}