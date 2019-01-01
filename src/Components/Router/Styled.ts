import { Group, styled } from "reakit"
import { palette } from "styled-tools"

export const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
`

export const Nav = styled(Group)`
  display: flex;
  justify-content: center;
  background: ${palette("primary")};
`
