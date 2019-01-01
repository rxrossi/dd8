import * as React from "react"
import Service from "entity/Service"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onEdit: (
  setView: setViewType
) => onSubmitType<Service> = setView => async (values, formApi) => {
  const { id, ...service } = values

  await Service.update(id, service).then(() => setView({ view: "SERVICES" }))
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
    const entity = await Service.findOne(this.props.id)
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
