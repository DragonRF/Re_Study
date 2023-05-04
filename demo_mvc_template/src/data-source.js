const {DataSource} = require("typeorm")
const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "eshop-app",
    synchronize: true,
    logging: true,
    entities: [
        require("./entities/user"),
        require("./entities/category"),

    ],
    subscribers: [],
    migrations: [],
})

module.exports = AppDataSource
