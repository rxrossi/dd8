import { Block, styled } from "reakit"
import { theme } from "styled-tools"

const Container = styled(Block)`
  height: calc(100vh - ${theme("sizing.topbar")});
`

export default Container
