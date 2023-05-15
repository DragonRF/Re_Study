const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        email: {
            unique: true,
            type: "varchar",
        },
        username: {
            type: "varchar",
        },
        role: {
            type: "varchar",
            default: "user", // set default value to "user"
        },
        address: {
            type: "varchar",
        },
        phone: {
            type: "varchar",
        },
        password: {
            type: "varchar",
        }
    },
});
