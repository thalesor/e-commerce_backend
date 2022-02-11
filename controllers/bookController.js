import { dbService } from '../services/db-service.js';

async function postBook(req, res)
{
    const data = res.locals.postData;
    try
    {
        data.views = 0;
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

async function getBooks(req, res)
{
    try
    {
        const books = await dbService.find("books",
        {}
        );

        if(books.length)
        return res.status(200).json(books);

        const response = `
        Não há livros cadastrados!`;
        return res.status(500).send(response);
    }
    catch(err)
    {
        const response = `
        Erro no servidor ao tentar retornar os livros cadastrados!`;
        return res.status(500).send(response);
    } 
}

async function getBook(req, res)
{
    try
    {
        const title = req.headers.title;
        const book = await dbService.find("books", { title: title }
        );
        if(book.length)
        return res.status(200).json(book);

        const response = `
        Não há livros cadastrados!`;
        return res.status(500).send(response);
    }
    catch(err)
    {
        const response = `
        Erro no servidor ao tentar retornar os livros cadastrados!`;
        return res.status(500).send(response);
    } 
}

export { 
    getBooks,
    postBook,
    getBook
}