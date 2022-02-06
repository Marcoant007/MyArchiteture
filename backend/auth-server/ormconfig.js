module.exports = {
    "type": "postgres",
    "host": process.env.DB_DATABASE_HOST,
    "port": process.env.DB_DATABASE_PORT,
    "username": process.env.DB_DATABASE_USER,
    "password": process.env.DB_DATABASE_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "logging": true,
    "logger": "file",
    "entities": [
        "./src/main/**/models/*.ts"
    ],
    "migrations": [
        "./src/shared/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/shared/database/migrations"
    }
}
