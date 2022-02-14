import { dbService } from '../services/db-service.js';

async function getCategories(req, res)
{
    try
    {
        const categories = await dbService.find("categories",
        {}
        );
        if(categories.length)
        {
            if(!res)
            return categories;
            else
            {
                res.status(200).json(categories);
                return;
            }
        }
        const response = `
        Não há categorias cadastradas!`;
        console.log(response);
        if(res)
        res.status(500).send(response);
    }
    catch(err)
    {
        const response = `
        Erro no servidor ao tentar retornar as categorias cadastradas!`;
        console.log(response);
        if(res)
        res.status(500).send(response);
    } 
}

async function registrarCategorias()
{
    const categories = await getCategories();
    if(!categories?.length)
    {
        try
        {
            const result = await dbService.insertMany("categories",
            [
                { name: "Terror"},
                {  name: "Mistério"},
                { name: "Culinária" }
            ]
            );
            if(result)
            {
                console.log("Categorias cadastradas com sucesso na base de dados");
                return;
            }
                console.log("Erro no banco de dados ao tentar cadastrar categorias");
            return;
        }
        catch(err)
        {
            console.log("Erro no servidor ao tentar cadastrar as categorias");
            return;
        } 
    }
}

export { 
    getCategories,
    registrarCategorias
}