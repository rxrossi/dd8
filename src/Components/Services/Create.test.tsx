import * as React from "react"
import * as Enzyme from "enzyme"
import * as formHelpers from "testUtils/formHelpers"
import wait from "testUtils/wait"
import Service from "entity/Service"
import Create from "./Create"

jest.mock("entity/Service")

describe("Services create", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Behavior", () => {
    describe("Success", () => {
      let wrapper: Enzyme.ReactWrapper
      const setView = jest.fn()

      beforeEach(async done => {
        wrapper = Enzyme.mount(<Create setView={setView} />)

        formHelpers.changeFieldByLabel(wrapper, "Nome", "Luzes")

        formHelpers.submitForm(wrapper)

        await wait()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Service.create).toHaveBeenCalledWith({
          name: "Luzes"
        })

        expect(Service.create().save).toHaveBeenCalled()
      })

      it("clears all fields on submit", () => {
        expect(formHelpers.getFieldsWithValues(wrapper)).toEqual([])
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "SERVICES" })
      })
    })
  })
})
