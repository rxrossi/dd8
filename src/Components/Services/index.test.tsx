import * as React from "react"
import { shallow } from "enzyme"
import Services from "."

describe("Service", () => {
  it("displays a list of services", () => {
    const wrapper = shallow(<Services setView={() => {}} />)

    expect(wrapper.find("[data-test='entities-list']")).toHaveLength(1)
  })

  it("calls set view correctly when clicks on new entity button", () => {
    const setView = jest.fn()
    const wrapper = shallow(<Services setView={setView} />)

    const button = wrapper.find("[data-test='create-new']")

    expect(button).toHaveLength(1)

    button.prop("onClick")(null)

    expect(setView).toHaveBeenCalledWith({ view: "SERVICES_CREATE" })
  })
})
