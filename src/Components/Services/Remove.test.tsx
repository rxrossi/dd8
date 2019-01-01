import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import Remove from "./Remove"

jest.mock("entity/Service")
const Service = require("entity/Service").default as {
  findOne: jest.Mock
  remove: jest.Mock
}

describe("Services remove", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  const service = {
    id: "2",
    name: "Luzes"
  }

  beforeEach(async done => {
    Service.findOne.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve(service)
        })
    )

    wrapper = mount(<Remove setView={setView} id="2" />)

    await wait()

    wrapper.update()

    done()
  })

  describe("Data loading", () => {
    it("calls the orm correctly", () => {
      expect(Service.findOne).toHaveBeenCalledWith("2")
    })

    it("shows the name of the entity", () => {
      expect(wrapper.text()).toContain("Luzes")
    })
  })

  describe("Behavior", () => {
    describe("Success", () => {
      let wrapper: ReactWrapper
      const setView = jest.fn()

      beforeEach(async done => {
        Service.findOne.mockImplementationOnce(
          () =>
            new Promise(resolve => {
              resolve({
                id: "2",
                name: "Luzes"
              })
            })
        )

        wrapper = mount(<Remove setView={setView} id="2" />)

        await wait()

        wrapper.update()

        wrapper.find("button[data-test='confirm']").prop("onClick")(null)

        await wait()

        wrapper.update()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Service.remove).toHaveBeenCalledWith(service)
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "SERVICES" })
      })
    })
  })
})
