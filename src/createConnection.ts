import "reflect-metadata"
import * as typeorm from "typeorm"
import * as path from "path"
import { remote } from "electron"
import Professional from "./entity/Professional"

const entities = {
  Professional
}

const dbPath =
  process.env["NODE_ENV"] === "test"
    ? ":memory:"
    : path.join(remote.app.getPath("appData"), "dd-manager.sqlite")

export default () =>
  typeorm.createConnection({
    entities: Object.values(entities),
    type: "sqlite",
    database: dbPath,
    synchronize: true,
    logging: false
  })
