const validation = (validateFn) => {
    return (req, res, next) => 
    {
        let data = null;
        if(req.method === 'GET')
            data = req.headers.data;
        else if(req.method === 'POST')
            data = req.body;

        const validation = validateFn(data);
        if(validation.hasErrors === false)
        {
            res.locals.postData = data;
            next();
        }
        res.status(422).send(`Erros durante a validação dos dados no servidor:
        ${validation.errors}`);
    };
  };