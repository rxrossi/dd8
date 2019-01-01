import * as React from "react"
import { shallow } from "enzyme"
import Clients from "."

describe("Professionals", () => {
  it("displays a list of clients", () => {
    const wrapper = shallow(<Clients setView={() => {}} />)

    expect(wrapper.find("[data-test='entities-list']")).toHaveLength(1)
  })

  it("calls set view correctly when clicks on new entity button", () => {
    const setView = jest.fn()
    const wrapper = shallow(<Clients setView={setView} />)

    const button = wrapper.find("[data-test='create-new']")

    expect(button).toHaveLength(1)

    button.prop("onClick")(null)

    expect(setView).toHaveBeenCalledWith({ view: "CLIENTS_CREATE" })
  })
})
