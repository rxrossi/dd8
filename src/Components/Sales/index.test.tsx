import * as React from "react"
import { shallow } from "enzyme"
import Professionals from "."

describe("Professionals", () => {
  it("displays a list of professionals", () => {
    const wrapper = shallow(<Professionals setView={() => {}} />)

    expect(wrapper.find("[data-test='entities-list']")).toHaveLength(1)
  })

  it("calls set view correctly when clicks on new entity button", () => {
    const setView = jest.fn()
    const wrapper = shallow(<Professionals setView={setView} />)

    const button = wrapper.find("[data-test='create-new']")

    expect(button).toHaveLength(1)

    button.prop("onClick")(null)

    expect(setView).toHaveBeenCalledWith({ view: "SALES_CREATE" })
  })
})
