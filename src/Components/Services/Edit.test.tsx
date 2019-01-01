import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import * as formHelpers from "testUtils/formHelpers"
import wait from "testUtils/wait"
import Edit from "./Edit"

jest.mock("entity/Service")
const Service = require("entity/Service").default as {
  findOne: jest.Mock
  update: jest.Mock
}

describe("Services edit", () => {
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
            name: "Corte"
          })
        })
    )

    wrapper = mount(<Edit setView={setView} id="2" />)

    await wait()

    wrapper.update()

    done()
  })

  describe("Data loading", () => {
    it("calls the orm correctly", () => {
      expect(Service.findOne).toHaveBeenCalledWith("2")
    })

    it("fill form fields with the entity", () => {
      const values = formHelpers.getFieldsWithValues(wrapper)
      expect(values).toMatchObject([
        { name: "name", value: "Corte", label: "Nome" }
      ])
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
                name: "Corte"
              })
            })
        )

        wrapper = mount(<Edit setView={setView} id="2" />)

        await wait()

        wrapper.update()

        formHelpers.changeFieldByLabel(wrapper, "Nome", "Luzes")

        formHelpers.submitForm(wrapper)

        await wait()

        wrapper.update()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Service.update).toHaveBeenCalledWith("2", {
          name: "Luzes"
        })
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "SERVICES" })
      })
    })
  })
})
