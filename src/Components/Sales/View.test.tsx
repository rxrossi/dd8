import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import View from "./View"

jest.mock("entity/Professional")
const Professional = require("entity/Professional").default as {
  findOne: jest.Mock
  update: jest.Mock
}

describe("Professionals edit", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  beforeEach(async done => {
    Professional.findOne.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve({
            id: "2",
            name: "Bia",
            percentage: 40
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
      expect(Professional.findOne).toHaveBeenCalledWith("2")
    })

    it("displays information about the entity", () => {
      expect(wrapper.text()).toContain("Bia")
      expect(wrapper.text()).toContain("40")
    })
  })
})
