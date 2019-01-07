import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import Remove from "./Remove"

jest.mock("entity/Sale")
const Sale = require("entity/Sale").default as {
  findOne: jest.Mock
  remove: jest.Mock
}

describe("Sales remove", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  const sale = {
    id: "2",
    service: {
      name: "Service"
    },
    professional: {
      name: "Professional"
    }
  }

  beforeEach(async done => {
    Sale.findOne.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve(sale)
        })
    )

    wrapper = mount(<Remove setView={setView} id="2" />)

    await wait()

    wrapper.update()

    done()
  })

  describe("Data loading", () => {
    it("calls the orm correctly", () => {
      expect(Sale.findOne).toHaveBeenCalledWith("2", {
        relations: ["service", "professional"]
      })
    })

    it("shows the name of the entity", () => {
      expect(wrapper.text()).toContain("Service")
    })
  })

  describe("Behavior", () => {
    describe("Success", () => {
      let wrapper: ReactWrapper
      const setView = jest.fn()

      beforeEach(async done => {
        Sale.findOne.mockImplementationOnce(
          () =>
            new Promise(resolve => {
              resolve(sale)
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
        expect(Sale.remove).toHaveBeenCalledWith(sale)
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "SALES" })
      })
    })
  })
})
