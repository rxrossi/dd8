import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import * as formHelpers from "testUtils/formHelpers"
import wait from "testUtils/wait"
import Edit from "./Edit"

jest.mock("entity/Client")
const Client = require("entity/Client").default as {
  findOne: jest.Mock
  update: jest.Mock
}

describe("Clients edit", () => {
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

    wrapper = mount(<Edit setView={setView} id="2" />)

    await wait()

    wrapper.update()

    done()
  })

  describe("Data loading", () => {
    it("calls the orm correctly", () => {
      expect(Client.findOne).toHaveBeenCalledWith("2")
    })

    it("fill form fields with the entity", () => {
      const values = formHelpers.getFieldsWithValues(wrapper)
      expect(values).toMatchObject([
        { name: "name", value: "Bia", label: "Nome" }
      ])
    })
  })

  describe("Behavior", () => {
    describe("Success", () => {
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

        wrapper = mount(<Edit setView={setView} id="2" />)

        await wait()

        wrapper.update()

        formHelpers.changeFieldByLabel(wrapper, "Nome", "Carla")

        formHelpers.submitForm(wrapper)

        await wait()

        wrapper.update()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Client.update).toHaveBeenCalledWith("2", {
          name: "Carla"
        })
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "CLIENTS" })
      })
    })
  })
})
