require("reflect-metadata")
const getAppData = require("appdata-path")

const dbPath = `${getAppData()}/dd-manager.sqlite`

module.exports = {
  type: "sqlite",
  database: dbPath,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: ["src/subscriber/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
}
