import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {

    main();

})();



async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    Server.start();
    // Crear una coleccion y documento

    // const newLog = await LogModel.create({
    //     message: 'Test Message desde Mongo',
    //     origin: "App.ts",
    //     level: 'low'
    // });
    // await newLog.save();
    // const logs = await LogModel.find();
    // console.log(logs[0].message)
    // console.log(envs)
}
