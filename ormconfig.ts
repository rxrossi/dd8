require("reflect-metadata")
const path = require("path")
const { remote } = require("electron")

const dbPath =
  process.env["NODE_ENV"] === "test"
    ? ":memory:"
    : path.join(remote.app.getPath("appData"), "dd-manager.sqlite")

module.exports = {
  type: "sqlite",
  database: dbPath,
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  },
  synchronize: false,
  logging: false,
  migrationsRun: true
}
