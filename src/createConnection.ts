import * as typeorm from "typeorm"
import { Client } from "./entity/Client"
import { Sale } from "./entity/Sale"
import { Professional } from "./entity/Professional"
import { Service } from "./entity/Service"
import * as Initial1551868341864 from "./migration/1551868341864-Initial"

// Need to add entities here instead of on ormconfig
// because if we add there, importing entities will not work
// saying that there is no repository for this on the connection

// we add migrations here because if we require ts-node
// on ormconfig, this function here throws a error
// if we dont require ts-node there, it wont work

export default () =>
  typeorm.getConnectionOptions().then(connectionOptions => {
    return typeorm.createConnection({
      ...connectionOptions,
      entities: [Client, Sale, Professional, Service],
      migrations: [Initial1551868341864.Initial1551868341864]
    })
  })
