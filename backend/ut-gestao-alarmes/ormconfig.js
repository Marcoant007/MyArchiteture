module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST || 'localhost',
    "port": process.env.DB_PORT || 5432,
    "username": process.env.DB_USER || 'postgres',
    "password": process.env.DB_PASSWORD || 'postgres',
    "database": process.env.DB_NAME || 'postgres',
    "entities": [
        "./src/modules/**/infra/database/models/*.ts"
    ],
    "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
}
