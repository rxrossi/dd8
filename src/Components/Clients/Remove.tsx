import * as React from "react"
import { styled, Block, Paragraph, Button } from "reakit"
import { Client } from "entity/Client"
import { setViewType } from "app/Components/Router"

const Container = styled(Block)`
  margin: 16px auto;
  border-radius: 4px;
  overflow: hidden;
  max-width: calc(100% - 32px);
  width: 100%;
`

interface IProps {
  setView: setViewType
  id: string
}

class Edit extends React.Component<IProps> {
  state = {
    entity: null
  }

  onRemove = () => {
    Client.remove(this.state.entity).then(() =>
      this.props.setView({ view: "CLIENTS" })
    )
  }

  async componentDidMount() {
    const entity = await Client.findOne(this.props.id)
    this.setState({ entity })
  }

  render() {
    const { entity } = this.state
    return (
      entity && (
        <Container>
          <Paragraph>Tem certeza que deseja remover {entity.name}?</Paragraph>
          <Button data-test="confirm" palette="danger" onClick={this.onRemove}>
            Sim
          </Button>
        </Container>
      )
    )
  }
}

export default Edit
