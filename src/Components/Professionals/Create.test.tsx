import * as React from "react"
import * as Enzyme from "enzyme"
import * as formHelpers from "testUtils/formHelpers"
import wait from "testUtils/wait"
import { Professional } from "entity/Professional"
import Create from "./Create"

jest.mock("entity/Professional")

describe("Professionals create", () => {
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
        expect(Professional.create).toHaveBeenCalledWith({
          name: "Ana",
          percentage: 50
        })

        expect(Professional.create().save).toHaveBeenCalled()
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
