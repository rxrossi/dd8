import * as React from "react"
import { Button, Block, styled } from "reakit"
import { setViewType } from "app/Components/Router"
import List from "./List"

const ButtonsWrapper = styled(Block)`
  margin: 16px 0;
  display: flex;
  justify-content: flex-end;
`

const Container = styled(Block)`
  margin: 16px auto;
  border-radius: 4px;
  overflow: hidden;
  max-width: calc(100% - 32px);
  width: 100%;
`

interface IProps {
  setView: setViewType
}

function Professionals({ setView }: IProps) {
  return (
    <Container>
      <List data-test="entities-list" setView={setView} />
      <ButtonsWrapper>
        <Button
          onClick={() => setView({ view: "PROFESSIONALS_CREATE" })}
          data-test="create-new"
        >
          Criar novo
        </Button>
      </ButtonsWrapper>
    </Container>
  )
}

export default Professionals
