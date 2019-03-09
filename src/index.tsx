require("reflect-metadata")
import * as electron from "electron"
import * as fs from "fs"
import * as path from "path"
import * as React from "react"
import * as ReactDOM from "react-dom"
import createConnection from "app/createConnection"
import Router from "app/Components/Router"
import Topbar from "app/Components/Topbar"
import Container from "app/Components/MainContainer"
import ThemeProvider from "app/Components/ThemeProvider"

class App extends React.Component {
  state = {
    dbConnected: false
  }
  componentDidMount() {
    createConnection().then(() => this.setState({ dbConnected: true }))
  }
  print() {
    const win = new electron.remote.BrowserWindow({
      width: 320,
      height: 500,
      webPreferences: {
        plugins: true
      }
    })
    win.loadURL(
      `data:text/html;charset=UTF-8, <div>some really nice test that works as expected everytime</div >`
    )
    setTimeout(() => {
      win.webContents.printToPDF(
        {
          pageSize: {
            width: 98400,
            height: 2250000
          }
        },
        (error, data) => {
          if (error) throw error
          const p = path.join(
            electron.remote.app.getPath("appData"),
            "tempPDF.pdf"
          )
          console.log(p)
          fs.writeFile(p, data, error => {
            if (error) throw error
            win.loadURL(

            )
            console.log("Write PDF successfully.")
          })
        }
      )
    }, 500)
  }
  render() {
    return (
      this.state.dbConnected && (
        <ThemeProvider>
          <Topbar />
          <Container>
            <button onClick={this.print}>print</button>
            <Router />
          </Container>
        </ThemeProvider>
      )
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
