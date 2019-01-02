import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import * as formHelpers from "testUtils/formHelpers"
import wait from "testUtils/wait"
import Edit from "./Edit"

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

    wrapper = mount(<Edit setView={setView} id="2" />)

    await wait()

    wrapper.update()

    done()
  })

  describe("Data loading", () => {
    it("calls the orm correctly", () => {
      expect(Professional.findOne).toHaveBeenCalledWith("2")
    })

    it("fill form fields with the entity", () => {
      const values = formHelpers.getFieldsWithValues(wrapper)
      expect(values).toMatchObject([
        { name: "name", value: "Bia", label: "Nome" },
        { name: "percentage", value: 40, label: "Porcentagem" }
      ])
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

        wrapper = mount(<Edit setView={setView} id="2" />)

        await wait()

        wrapper.update()

        formHelpers.changeFieldByLabel(wrapper, "Nome", "Carla")
        formHelpers.changeFieldByLabel(wrapper, "Porcentagem", 50)

        formHelpers.submitForm(wrapper)

        await wait()

        wrapper.update()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Professional.update).toHaveBeenCalledWith("2", {
          name: "Carla",
          percentage: 50
        })
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "PROFESSIONALS" })
      })
    })
  })
})
