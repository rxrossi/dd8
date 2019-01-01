import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import List from "./List"

jest.mock("entity/Professional")
const Professional = require("entity/Professional").default as {
  find: jest.Mock
}

describe("Professionals List", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  beforeEach(async done => {
    Professional.find.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve([
            {
              id: "1",
              name: "Ana",
              percentage: 50
            }
          ])
        })
    )

    wrapper = mount(<List setView={setView} />)

    await wait()

    wrapper.update()

    done()
  })

  it("Lists the professionals", async () => {
    expect(wrapper.text()).toContain("Ana")
  })

  it("has a button to edit the professional", async () => {
    wrapper.find("button[data-test='edit-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "PROFESSIONALS_EDIT"
    })
  })

  it("has a button to remove the professional", async () => {
    wrapper.find("button[data-test='remove-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "PROFESSIONALS_REMOVE"
    })
  })

  it("has a button to view details of the professional", async () => {
    wrapper.find("button[data-test='view-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "PROFESSIONALS_VIEW"
    })
  })
})
