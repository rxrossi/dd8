import * as React from "react"
import * as Enzyme from "enzyme"
import * as formHelpers from "testUtils/formHelpers"
import wait from "testUtils/wait"
import { Sale } from "entity/Sale"
import Create from "./Create"

jest.mock("entity/Sale")
jest.mock("entity/Professional")
jest.mock("entity/Client")
jest.mock("entity/Service")

const Professional = require("entity/Professional").default as {
  find: jest.Mock
}

const Client = require("entity/Client").default as {
  find: jest.Mock
}

const Service = require("entity/Service").default as {
  find: jest.Mock
}

Professional.find.mockResolvedValue([
  {
    id: "1",
    name: "Professional"
  }
])

Service.find.mockResolvedValue([
  {
    id: 1,
    name: "Service",
    value: 100
  }
])

Client.find.mockResolvedValue([
  {
    id: "1",
    name: "Client"
  }
])

describe("Sales create", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Behavior", () => {
    describe("Success", () => {
      let wrapper: Enzyme.ReactWrapper
      const setView = jest.fn()

      beforeEach(async done => {
        wrapper = Enzyme.mount(<Create setView={setView} />)

        await wait()
        wrapper.update()

        formHelpers.changeSelectEntity(wrapper, "Profissional", 1)
        formHelpers.changeSelectEntity(wrapper, "Serviço", 1)
        formHelpers.changeSelectEntity(wrapper, "Cliente", 1)
        formHelpers.changeFieldByLabel(wrapper, "Desconto", 10)
        formHelpers.changeFieldByLabel(wrapper, "Data", "2018-10-06")
        formHelpers.changeTextareaByLabel(wrapper, "Notas", "Some notes")

        await wait()
        wrapper.update()

        formHelpers.submitForm(wrapper)

        await wait()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Sale.create).toHaveBeenCalledWith({
          professional: 1,
          service: 1,
          client: 1,
          value: 10000,
          discount: 10,
          date: "2018-10-06",
          notes: "Some notes"
        })

        expect(Sale.create().save).toHaveBeenCalled()
      })

      it("clears all fields on submit", () => {
        expect(formHelpers.getFieldsWithValues(wrapper)).toEqual([])
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "SALES" })
      })
    })
  })
})
