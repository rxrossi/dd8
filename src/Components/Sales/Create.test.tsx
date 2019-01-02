import * as React from "react"
import * as Enzyme from "enzyme"
import * as formHelpers from "testUtils/formHelpers"
import wait from "testUtils/wait"
import Sale from "entity/Sale"
import Create from "./Create"

jest.mock("entity/Sale")

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

        formHelpers.changeFieldByLabel(wrapper, "Nome", "Ana")
        formHelpers.changeFieldByLabel(wrapper, "Porcentagem", 50)

        formHelpers.submitForm(wrapper)

        await wait()

        done()
      })

      it("calls the orm correctly", () => {
        expect(Sale.create).toHaveBeenCalledWith({
          name: "Ana",
          percentage: 50
        })

        expect(Sale.create().save).toHaveBeenCalled()
      })

      it("clears all fields on submit", () => {
        expect(formHelpers.getFieldsWithValues(wrapper)).toEqual([])
      })

      it("calls setView correctly", () => {
        expect(setView).toHaveBeenCalledWith({ view: "PROFESSIONALS" })
      })
    })
  })
})
