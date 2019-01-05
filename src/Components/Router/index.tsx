import * as React from "react"
import { Button } from "reakit"
import theme from "app/theme"
import { Nav, Container } from "./Styled"
import { ViewName, Views } from "./Views"

export type setViewType = (
  { view, params }: { view: ViewName; params?: {} }
) => void

class Router extends React.Component {
  state: {
    view: ViewName
    params: {}
  } = {
    view: "SALES_EDIT",
    params: { id: 3 }
  }

  setView: setViewType = ({ view, params }) => {
    this.setState({ view, params })
  }

  renderNavButton = (
    view: ViewName,
    label: string,
    showButtonInNav: boolean
  ) => {
    return (
      showButtonInNav && (
        <Button
          key={view}
          backgroundColor={
            this.state.view.startsWith(view) && theme.palette.primaryActive
          }
          onClick={() => this.setView({ view })}
        >
          {label}
        </Button>
      )
    )
  }

  render() {
    const { component: View } = Views[this.state.view]

    return (
      <Container>
        <Nav>
          {Object.entries(Views).map(([key, { label, showButtonInNav }]) =>
            this.renderNavButton(key as ViewName, label, showButtonInNav)
          )}
        </Nav>
        <View setView={this.setView} {...this.state.params} />
      </Container>
    )
  }
}

export default Router
