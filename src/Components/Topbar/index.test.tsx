import * as React from "react"
import { mount } from "enzyme"
import Topbar from "."
import { remote } from "electron"

describe("Topbar", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("closes the window", () => {
    mount(<Topbar />)
      .find("[data-test='close-button']")
      .at(0)
      .prop("onClick")(null)

    expect(remote.BrowserWindow.getFocusedWindow().close).toHaveBeenCalled()
  })

  it("minimize the window", () => {
    mount(<Topbar />)
      .find("[data-test='close-minimize']")
      .at(0)
      .prop("onClick")(null)

    expect(remote.BrowserWindow.getFocusedWindow().minimize).toHaveBeenCalled()
  })

  it("maximize the window ", () => {
    mount(<Topbar />)
      .find("[data-test='close-maximize']")
      .at(0)
      .prop("onClick")(null)

    expect(remote.BrowserWindow.getFocusedWindow().maximize).toHaveBeenCalled()
  })

  it("unmaximize the window ", () => {
    const window = remote.BrowserWindow.getFocusedWindow()
    ;(window.isMaximized as jest.Mock).mockImplementation(() => true)

    mount(<Topbar />)
      .find("[data-test='close-maximize']")
      .at(0)
      .prop("onClick")(null)

    expect(window.unmaximize).toHaveBeenCalled()
  })
})
