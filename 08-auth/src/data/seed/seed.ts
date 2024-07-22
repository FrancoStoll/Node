import { envs } from "../../config";
import { CategoryModel, MongoDB, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";


(async () => {

    await MongoDB.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })
    await main();


    await MongoDB.disconnect();

})()

const randomBetween0Andx = (x: number) => {

    return Math.floor(Math.random() * x); // 0,5
}



async function main() {

    // Borrar
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])

    // Crear usuarios
    const users = await UserModel.insertMany(seedData.users)

    // Crear categorias
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {

            return {
                ...category,
                user: users[0]._id
            }

        })
    )

    // Crear productos
    const products = await ProductModel.insertMany(
        seedData.products.map(product => {


            return {
                ...product,
                user: users[randomBetween0Andx(seedData.users.length - 1)]._id,
                category: categories[randomBetween0Andx(seedData.categories.length - 1)]._id
            }
        })
    )


    console.log('SEEDED!');
}