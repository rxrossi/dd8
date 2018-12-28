import { mount } from "enzyme"
import * as React from "react"
import Query from "."
import Professional from "../entities/Professional"
import createConnection from "../createConnection"
import wait from "../../testUtils/wait"

describe("Query", () => {
  beforeEach(async () => {
    await createConnection()

    return Professional.create({
      name: "Timber",
      percentage: 25
    }).save()
  })

  it("gets all entities", async () => {
    const Child: (
      arg0: { entities: Array<Professional> }
    ) => React.ReactElement<{}> = () => <div />

    const wrapper = mount(
      <Query<Professional> entity={Professional}>
        {({ entities }) => <Child entities={entities} />}
      </Query>
    )

    await wait(20)

    wrapper.update()

    expect(wrapper.find(Child).props()).toEqual({
      entities: [
        {
          id: 1,
          name: "Timber",
          percentage: 25
        }
      ]
    })
  })
})
