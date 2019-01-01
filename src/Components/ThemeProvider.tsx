import * as React from "react"
import { Provider } from "reakit"
import theme from "app/theme"

export default ({ children }: { children: React.ReactNode }) => (
  <Provider theme={theme}>
    <React.Fragment>{children}</React.Fragment>
  </Provider>
)
