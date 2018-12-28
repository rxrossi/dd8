import * as React from "react"
import * as ReactDOM from "react-dom"
import createConnection from "./createConnection"

createConnection()

const App = () => <div>"I'm a react component"</div>

ReactDOM.render(<App />, document.getElementById("root"))
