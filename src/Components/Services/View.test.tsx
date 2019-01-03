import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import View from "./View"

jest.mock("entity/Service")
const Service = require("entity/Service").default as {
  findOne: jest.Mock
  update: jest.Mock
}

describe("Services view", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  beforeEach(async done => {
    Service.findOne.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve({
            id: "2",
            name: "Luzes",
            value: 100
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
      expect(Service.findOne).toHaveBeenCalledWith("2")
    })

    it("displays information about the entity", () => {
      expect(wrapper.text()).toContain("Luzes")
      expect(wrapper.text()).toContain("100")
    })
  })
})
