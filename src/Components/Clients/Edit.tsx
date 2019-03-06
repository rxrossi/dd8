import * as React from "react"
import { Client } from "entity/Client"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onEdit: (
  setView: setViewType
) => onSubmitType<Client> = setView => async (values, formApi) => {
  const { id, ...client } = values

  await Client.update(id, client).then(() => setView({ view: "CLIENTS" }))
}

interface IProps {
  setView: setViewType
  id: string
}

class Edit extends React.Component<IProps> {
  state = {
    entity: null
  }

  async componentDidMount() {
    const entity = await Client.findOne(this.props.id)
    this.setState({ entity })
  }

  render() {
    const { entity } = this.state
    const { setView } = this.props
    return (
      entity && (
        <div>
          <Form entity={entity} onSubmit={onEdit(setView)} data-test="form" />
        </div>
      )
    )
  }
}

export default Edit
