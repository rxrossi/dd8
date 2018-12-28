import * as React from "react"
import "reflect-metadata"
import { getRepository } from "typeorm"

interface IProps<entity> {
  entity: { name: string }
  children: (
    { entities }: { entities: Array<entity> }
  ) => React.ReactElement<{}>
}

class Query<entity> extends React.Component<IProps<entity>> {
  repository = getRepository(this.props.entity.name)

  state = {
    entities: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({ entities: await this.repository.find() })
  }

  render() {
    return this.props.children(this.state)
  }
}

export default Query
