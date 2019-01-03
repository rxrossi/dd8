import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import List from "./List"

jest.mock("entity/Service")
const Service = require("entity/Service").default as {
  find: jest.Mock
}

describe("Services List", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  beforeEach(async done => {
    Service.find.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve([
            {
              id: "1",
              name: "Luzes",
              value: 100
            }
          ])
        })
    )

    wrapper = mount(<List setView={setView} />)

    await wait()

    wrapper.update()

    done()
  })

  it("Lists the clients", async () => {
    expect(wrapper.text()).toContain("Luzes")
    expect(wrapper.text()).toContain("100")
  })

  it("has a button to edit the service", async () => {
    wrapper.find("button[data-test='edit-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "SERVICES_EDIT"
    })
  })

  it("has a button to remove the service", async () => {
    wrapper.find("button[data-test='remove-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "SERVICES_REMOVE"
    })
  })

  it("has a button to view details of the service", async () => {
    wrapper.find("button[data-test='view-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "SERVICES_VIEW"
    })
  })
})
