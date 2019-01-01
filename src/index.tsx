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
  render() {
    return (
      this.state.dbConnected && (
        <ThemeProvider>
          <Topbar />
          <Container>
            <Router />
          </Container>
        </ThemeProvider>
      )
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
