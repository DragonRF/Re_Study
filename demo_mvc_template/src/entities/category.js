const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Category",
    tableName: "categories",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
    },

});