import * as React from "react"
import { Heading, Block, styled } from "reakit"
import Service from "entity/Service"
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

class View extends React.Component<IProps> {
  state = {
    entity: null
  }

  async componentDidMount() {
    const entity = await Service.findOne(this.props.id)
    this.setState({ entity })
  }

  render() {
    const { entity } = this.state
    return (
      entity && (
        <Container>
          <Heading>{entity.name}</Heading>
        </Container>
      )
    )
  }
}

export default View
