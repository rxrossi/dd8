import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import List from "./List"

jest.mock("entity/Sale")
const Sale = require("entity/Sale").default as {
  find: jest.Mock
}

describe("Sales List", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  beforeEach(async done => {
    Sale.find.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve([
            {
              id: "1",
              service: {
                name: "Service"
              },
              professional: {
                name: "Professional"
              },
              client: {
                name: "Client"
              }
            }
          ])
        })
    )

    wrapper = mount(<List setView={setView} />)

    await wait()

    wrapper.update()

    done()
  })

  it("Lists the sale", async () => {
    expect(wrapper.text()).toContain("Service")
  })

  it("has a button to edit the professional", async () => {
    wrapper.find("button[data-test='edit-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "SALES_EDIT"
    })
  })

  it("has a button to remove the professional", async () => {
    wrapper.find("button[data-test='remove-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "SALES_REMOVE"
    })
  })

  it("has a button to view details of the professional", async () => {
    wrapper.find("button[data-test='view-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "SALES_VIEW"
    })
  })
})
