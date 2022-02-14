import { dbService } from "../services/db-service.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

function uniqByKey(a, key) {
    let seen = new Set();
    return a.filter(item => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}

export async function registrarCompra(req, res) {
	const user = res.locals.user;
	const time = dayjs().locale("pe-tb").format("DD/MM/YY HH:mm");
	const compras = { ...req.body, userID: user._id, data: time };
	const uniqueListOfBooks = uniqByKey(compras.produtos, p => p._id);
	try {
		await dbService.insert("compras", compras);
			await uniqueListOfBooks.forEach(async (produto) => {
			const removeTotalFromStock = compras.produtos.filter(p => p._id = produto._id).length;
			const returnedProduto = await dbService.find("books", {_id: new ObjectId(`${produto._id}`)});
			if(returnedProduto[0]?.in_stock > 0)
			{
				const toUpdateStock = await dbService.update("books", {_id: new ObjectId(`${produto._id}`)}, {in_stock: returnedProduto[0]?.in_stock-removeTotalFromStock})
			}
		});
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send("erro ao tentar realizar a compra");
	}
}

export async function getCompras(req, res) {
	const user = res.locals.user;

	try {
		const data = await dbService.find("compras", { userID: user._id });
		res.send(data);
	} catch {
		return res.sendStatus(500);
	}
}
