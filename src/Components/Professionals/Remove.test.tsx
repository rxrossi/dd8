import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import Remove from "./Remove"

jest.mock("entity/Professional")
const Professional = require("entity/Professional").default as {
  findOne: jest.Mock
  remove: jest.Mock
}

describe("Professionals remove", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  const professional = {
    id: "2",
    name: "Bia",
    percentage: 40
  }

  beforeEach(async done => {
    Professional.findOne.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve(professional)
        })
    )

    wrapper = mount(<Remove setView={setView} id="2" />)

    await wait()

    wrapper.update()

    done()
  })

  describe("Data loading", () => {
    it("calls the orm correctly", () => {
      expect(Professional.findOne).toHaveBeenCalledWith("2")
    })

    it("shows the name of the entity", () => {
      expect(wrapper.text()).toContain("Bia")
    })
  })

  describe("Behavior", () => {
    describe("Success", () => {
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

        wrapper = mount(<Remove setView={setView} id="2" />)

        await wait()

        wrapper.update()

        wrapper.find("button[data-test='confirm']").prop("onClick")(null)

        await wait()

        wrapper.update()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Professional.remove).toHaveBeenCalledWith(professional)
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "PROFESSIONALS" })
      })
    })
  })
})
