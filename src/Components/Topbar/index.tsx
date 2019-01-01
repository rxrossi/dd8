import * as React from "react"
import { remote } from "electron"
import {
  Container,
  Button,
  CloseIcon,
  MinimizeIcon,
  MaximizeIcon
} from "./Styled"

class Topbar extends React.Component {
  handleClose = () => {
    remote.BrowserWindow.getFocusedWindow().close()
  }

  handleMinimize = () => {
    remote.BrowserWindow.getFocusedWindow().minimize()
  }

  toggleMaximize = () => {
    const window = remote.BrowserWindow.getFocusedWindow()
    window.isMaximized() ? window.unmaximize() : window.maximize()
  }

  render() {
    return (
      <Container onDoubleClick={this.toggleMaximize}>
        <Button data-test="close-button" onClick={this.handleClose}>
          <CloseIcon />
        </Button>
        <Button data-test="close-maximize" onClick={this.toggleMaximize}>
          <MaximizeIcon />
        </Button>
        <Button data-test="close-minimize" onClick={this.handleMinimize}>
          <MinimizeIcon />
        </Button>
      </Container>
    )
  }
}

export default Topbar
