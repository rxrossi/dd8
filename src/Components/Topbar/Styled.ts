import { styled, Block } from "reakit"
import { palette, theme } from "styled-tools"
import { IoIosResize, IoIosClose, IoIosRemove } from "react-icons/io"

export const CloseIcon = IoIosClose
export const MinimizeIcon = IoIosRemove
export const MaximizeIcon = styled(IoIosResize)`
  height: 8px;
`

export const Container = styled(Block)`
  display: flex;
  flex-direction: row-reverse;
  border-bottom: 1px solid ${palette("primary", 4)};
  height: ${theme("sizing.topbar")};
  -webkit-app-region: drag;
  -webkit-user-select: none;
`

export const Button = styled.button`
  display: flex;
  border: 1px solid ${palette("primary", 5)};
  border-bottom: 1px solid ${palette("primary", 4)};
  box-sizing: border-box;
  background: none;
  border-radius: 0;
  outline: 0;
  height: ${theme("sizing.topbar")};
  &:hover {
    background: ${palette("primary", 0)};

    & > svg {
      fill: white;
    }
  }

  & > svg {
    height: 16px;
    width: 16px;
    fill: ${palette("primary", 1)};
  }
`
