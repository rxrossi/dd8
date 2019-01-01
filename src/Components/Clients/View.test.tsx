import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import View from "./View"

jest.mock("entity/Client")
const Client = require("entity/Client").default as {
  findOne: jest.Mock
  update: jest.Mock
}

describe("Clients view", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  beforeEach(async done => {
    Client.findOne.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve({
            id: "2",
            name: "Bia"
          })
        })
    )

    wrapper = mount(<View setView={setView} id="2" />)

    await wait()

    wrapper.update()

    done()
  })

  describe("Data loading", () => {
    it("calls the orm correctly", () => {
      expect(Client.findOne).toHaveBeenCalledWith("2")
    })

    it("displays information about the entity", () => {
      expect(wrapper.text()).toContain("Bia")
    })
  })
})
