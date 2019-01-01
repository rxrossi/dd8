import { Image, styled } from "reakit"
import * as React from "react"
import * as logo from "app/images/logo.png"

export const Logo = styled(Image)`
  display: block;
  margin: 4% auto;
  height: 80%;
`

function Dashboard() {
  return <Logo src={logo} alt="" />
}

export default Dashboard
