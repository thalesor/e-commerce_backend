import { dbService } from '../services/db-service.js';

async function postBook(req, res)
{
    const data = res.locals.postData;
    try
    {
        const result = await dbService.insert("books",
        data
        );
        if(result)
        {
            res.sendStatus(201);
            return;
        }
        const response = `
        Não será possível cadastrar o livro devido a um erro na base de dados!`;
        res.status(500).send(response);
    }
    catch(err)
    {
        const response = `
        Não será possível registrar o livro devido a um erro no servidor!`;
        res.status(500).send(response);
    } 
}

export { 
    postBook
}