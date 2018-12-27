const path = window.require("path")
const remote = window.require("electron").remote

declare global {
  interface Window {
    require: any
  }
}
const typeorm = window.require("typeorm")

const entities = {
  Professional: require("./Professional").default
}

const dbPath = path.join(remote.app.getPath("appData"), "dd-manager.sqlite")

const connection = typeorm.createConnection({
  entities: Object.values(entities),
  type: "sqlite",
  database: dbPath,
  synchronize: true,
  logging: false
})

export default {
  connection,
  ...entities
}
