import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import wait from "testUtils/wait"
import List from "./List"

jest.mock("entity/Client")
const Client = require("entity/Client").default as {
  find: jest.Mock
}

describe("Clients List", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let wrapper: ReactWrapper
  const setView = jest.fn()

  beforeEach(async done => {
    Client.find.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve([
            {
              id: "1",
              name: "Ana"
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
    expect(wrapper.text()).toContain("Ana")
  })

  it("has a button to edit the professional", async () => {
    wrapper.find("button[data-test='edit-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "CLIENTS_EDIT"
    })
  })

  it("has a button to remove the professional", async () => {
    wrapper.find("button[data-test='remove-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "CLIENTS_REMOVE"
    })
  })

  it("has a button to view details of the professional", async () => {
    wrapper.find("button[data-test='view-entity']").prop("onClick")(null)
    expect(setView).toHaveBeenCalledWith({
      params: { id: "1" },
      view: "CLIENTS_VIEW"
    })
  })
})
