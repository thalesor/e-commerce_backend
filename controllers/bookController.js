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
        {
            if(!res)
            return books;
            else
            {
                res.status(200).json(books);
                return;
            }
        }
        const response = `
        Não há livros cadastrados!`;
        console.log(response);
        if(res)
        res.status(500).send(response);
    }
    catch(err)
    {
        const response = `
        Erro no servidor ao tentar retornar os livros cadastrados!`;
        console.log(response);
        if(res)
        res.status(500).send(response);
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

async function registrarLivros()
{
    const books = await getBooks();
    if(!books?.length)
    {
        try
        {
            const result = await dbService.insertMany("books",
            [
                {
                    title: 'O Exorcista',
                    category: 'Terror',
                    imageUrl: 'https://images-submarino.b2w.io/produtos/134170806/imagens/livro-o-exorcista/134170806_1_large.jpg',
                    description: `Um clássico do terror com mais de 13 milhões de exemplares vendidos “Impossível parar
                     de ler. Poe e Mary Shelley reconheceriam [William Peter Blatty] como mais um companheiro do limbo
                      ambíguo entre o natural e o sobrenatural... De arrepiar.” – Life Uma obra que mudou a cultura
                       pop para sempre, O exorcista é o livro que deu origem ao maior filme de terror do século XX.
                        Quatro décadas após chocar o mundo inteiro, a obra-prima de William Peter Blatty permanece 
                        uma metáfora moderna do combate entre o sagrado e o profano, em um dos romances mais macabros 
                        já escritos.. O mal assume várias formas. Seja com monstros, fantasmas ou demônios, 
                        tanto a literatura quanto o cinema sempre foram bem-sucedidos em representar a essência do nosso lado mais reprovável.
                    `,
                    value: 28.71,
                    in_stock: 80,
                    views: 0
                },
                {
                    title: 'It: A coisa',
                    category: 'Terror',
                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51z0s3GcvwL._SX346_BO1,204,203,200_.jpg',
                    description: `Nesse clássico que inspirou os filmes da Warner, um grupo de amigos conhecido como Clube dos Otários aprende o real sentido da amizade, do amor, da confiança... e do medo. O mais profundo e tenebroso medo.
                    Durante as férias de 1958, em uma pacata cidadezinha chamada Derry, um grupo de sete amigos começa a ver coisas estranhas. Um conta que viu um palhaço, outro que viu uma múmia. Finalmente, acabam descobrindo que estavam todos
                     vendo a mesma coisa: um ser sobrenatural e maligno que pode assumir várias formas. É assim que Bill, Beverly, Eddie, Ben, Richie, Mike e Stan enfrentam a Coisa pela primeira vez.
                    Quase trinta anos depois, o grupo volta a se encontrar. Mike, o único que permaneceu em Derry, dá o sinal ― uma nova onda de terror tomou a pequena cidade.
                     É preciso unir forças novamente. Só eles têm a chave do enigma. Só eles sabem o que se esconde nas entranhas de Derry. Só eles podem vencer a Coisa.
                    “Mesmo depois de tantos anos, o público continua obcecado por IT. Ficamos obcecados porque todos temos medos. Todos temos algo que nos assusta, sejam palhaços e aranhas ou coisas que se escondem em um lugar muito mais profundo de nossa mente.
                     Este livro fala com todo mundo. É o romance mais assustador de King, e duvido que isso vá mudar” ― The Guardian.
                    `,
                    value: 53.80,
                    in_stock: 120,
                    views: 0
                },
                {
                    title: 'O Chamado de Cthulhu',
                    category: 'Terror',
                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ifevEGEbL._SX320_BO1,204,203,200_.jpg',
                    description: `O conto que dá nome à coletânea é um dos grandes clássicos do horror do século XX.
                     O livro reúne ainda outros seis textos, escritos ao longo da vida do autor, desde sua estreia literária com Dagon até pouco antes de sua morte.
                     Contém o inédito A música de Erich Zann, considerado pelo próprio Lovecraft um de seus melhores escritos.
                      No apêndice, o leitor encontrará ainda uma carta do escritor ao amigo R.Michael, em que fala sobre sua personalidade e sua vida, e um artigo em que discute o método que empregava na criação de seus contos.

                    `,
                    value: 36.00,
                    in_stock: 37,
                    views: 0
                },
                {
                    title: 'O cão dos Baskervilles',
                    category: 'Mistério',
                    imageUrl: 'https://images-submarino.b2w.io/produtos/01/00/item/7406/1/7406139GG.jpg',
                    description: `O milionário inglês Sir Charles Baskerville é encontrado morto no pântano e um ataque cardíaco é a causa provável, mas há quem acredite que um cão-fantasma assombra a região,
                     matando há gerações homens da família Baskerville. Sherlock Holmes e seu ajudante Watson são convocados para resolver o mistério. Escrito em 1902 por Sir Arthur Conan Doyle,
                      o mais conhecido romance com o lendário detetive já inspirou cerca de vinte adaptações para o cinema.
                    `,
                    value: 20.18,
                    in_stock: 22,
                    views: 0
                },
                {
                    title: 'O Assassinato De Roger Ackroyd',
                    category: 'Mistério',
                    imageUrl: 'https://images-submarino.b2w.io/produtos/119960236/imagens/livro-o-assassinato-de-roger-ackroyd/119960236_1_large.jpg',
                    description: `Em uma noite de setembro, o milionário Roger Ackroyd é encontrado morto, esfaqueado com uma adaga tunisiana – objeto raro de sua coleção particular – no quarto da mansão Fernly Park na pacata vila de King’s Abbott.
                    A morte do fidalgo industrial é a terceira de uma misteriosa sequência de crimes, iniciada com a de Ashley Ferrars, que pode ter sido causada ou por uma ingestão acidental de soníferos ou envenenamento articulado por sua esposa – esta, aliás, completa a sequência de mortes, num provável suicídio.
                    Os três crimes em série chamam a atenção da velha Caroline Sheppard, irmã do dr. Sheppard, médico da cidade e narrador da história. Suspeitando de que haja uma relação entre as mortes, dada a proximidade de miss Ferrars com o também viúvo Roger Ackroyd, Caroline pede a ajuda do então aposentado detetive belga Hercule Poirot,
                    que passava suas merecidas férias na vila.
                    Ameaças, chantagens, vícios, heranças, obsessões amorosas e uma carta reveladora deixada por miss Ferrars compõem o cenário desta surpreendente trama, cujo transcorrer elenca novos suspeitos a todo instante, exigindo a habitual perspicácia do detetive Poirot em seu retorno ao mundo das investigações.
                    O assassinato de Roger Ackroyd é um dos mais famosos romances policiais da rainha do crime.
                    `,
                    value: 39.91,
                    in_stock: 76,
                    views: 0
                },
                {
                    title: 'A Garota Do Lago',
                    category: 'Mistério',
                    imageUrl: 'https://images-submarino.b2w.io/produtos/130884182/imagens/livro-a-garota-do-lago/130884182_1_large.jpg',
                    description: `Summit Lake, uma pequena cidade entre montanhas, é esse tipo de lugar, bucólico e com encantadoras casas dispostas à beira de um longo trecho de água intocada.
                    Duas semanas atrás, a estudante de direito Becca Eckersley foi brutalmente assassinada em uma dessas casas.
                     Filha de um poderoso advogado, Becca estava no auge de sua vida. Atraída instintivamente pela notícia, a repórter Kelsey Castle vai até a cidade para investigar o caso.
                    ...E LOGO SE ESTABELECE UMA CONEXÃO ÍNTIMA QUANDO UM VIVO CAMINHA NAS MESMAS PEGADAS DOS MORTOS...E enquanto descobre sobre as amizades de Becca, sua vida amorosa e os segredos que ela guardava,
                     a repórter fica cada vez mais convencida de que a verdade sobre o que aconteceu com Becca pode ser a chave para superar as marcas sombrias de seu próprio passado.
                    `,
                    value: 8.60,
                    in_stock: 35,
                    views: 0
                },
                {
                    title: 'Confeitaria Escalafobetica: Sobremesas Explicadas Tim-Tim Por Tim-Tim',
                    category: 'Culinária',
                    imageUrl: 'https://images-submarino.b2w.io/produtos/50123742/imagens/confeitaria-escalafobetica-sobremesas-explicadas-tim-tim-por-tim-tim/50123742_1_large.jpg',
                    description: `Apaixonada pela confeitaria e suas técnicas verdadeiras, obcecada pelas mídias e, acima de tudo, glutona, Raiza Costa criou o Dulce Delight em 2010,
                    o primeiro canal on-line dedicado à confeitaria, antes mesmo de ser formada pelo French Culinary Institute de Nova York. Sua direção de arte, irreverência e humor renderam milhares de visualizações para o canal,
                    que se tornou referência e se estendeu para um programa diário no gnt, o Rainha da Cocada. Com um pé no vintage e outro na inovação, e sempre com seu cãozinho Lancelote por perto, Raiza mistura tecnologia e funcionalidade com elementos decorativos
                    que muitas vezes lembram a casa aconchegante de uma avó querida, mas sem perder a sua espontaneidade nem os códigos contemporâneos. Neste livro, você encontra receitas exclusivas e também as de maior sucesso da chef, sempre acompanhadas de importantes dicas que fazem a diferença.
                    Nele, são ensinadas técnicas de confeitaria avançadas para seu séquito de fãs (e também para os fãs da confeitaria), de um jeito simples e divertido! Lançamento do Senac São Paulo, Confeitaria escalafobética: sobremesas explicadas tim-tim por tim-tim é uma deliciosidade em todos os sentidos.
                    Das receitas, que refletem um grande respeito pelas técnicas tradicionais francesas, ao projeto gráfico primoroso, com fotos criativas que ilustram todas as sobremesas e doces, tudo foi pensado para retratar, o mais fielmente possível, não só a trajetória de uma profissional, mas também a essência de uma personalidade intensa e descontraída.
                    `,
                    value: 70.89,
                    in_stock: 18,
                    views: 0
                },
                {
                    title: 'Direto ao pão: receitas caseiras para todas as horas',
                    category: 'Culinária',
                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51TGmas3THL._SX372_BO1,204,203,200_.jpg',
                    description: `Que pão você quer para o seu café da manhã? Pão francês? Baguete? Um pão rústico, bem cascudo, ou um pãozinho de leite ultramacio? Todas essas receitas estão neste novo livro de Luiz Américo Camargo, com produção de Rita Lobo e sua equipe. E ainda tem broa portuguesa, pão sírio, pão de hambúrguer e de cachorro-quente, focaccia, ciabatta, chocotone... São cerca de 30 tipos diferentes de pão (quase todos com fermento biológico), além de sugestões de recheios, acompanhamentos e reaproveitamentos, num total de 40 receitas. 'Direto ao Pão' é um guia completo para quem quer se iniciar na panificação caseira. Da escolha dos ingredientes ao resfriamento pós-forno, você vai aprender em detalhes todas as etapas para assar o filão perfeito. Luiz Américo Camargo, autor de sucesso com Pão Nosso (também publicado pela parceria Panelinha-Senac), ensina estratégias para controlar o tempo e não ficar preso na hora do preparo. Com planejamento, você dribla a correria e encaixa o pão ― e aquele perfume que sai do forno! ― na sua rotina. E para você ler entre uma sova e outra, o livro ainda traz as crônicas do padeiro, numa prosa deliciosa como as fornadas.
                    `,
                    value: 101.25,
                    in_stock: 58,
                    views: 0
                },
            ]
            );
            if(result)
            {
                console.log("Livros cadastrados com sucesso na base de dados");
                return;
            }
                console.log("Erro no banco de dados ao tentar cadastrar livros");
            return;
        }
        catch(err)
        {
            console.log("Erro no servidor ao tentar cadastrar livros");
            return;
        } 
    }
    else
    {
        console.log("Não será necessário cadastrar livros");
        return
    }
}


export { 
    getBooks,
    postBook,
    getBook,
    registrarLivros
}