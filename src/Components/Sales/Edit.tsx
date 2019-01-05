import * as React from "react"
import Sale from "entity/Sale"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onEdit: (setView: setViewType) => onSubmitType<Sale> = setView => async (
  values,
  formApi
) => {
  const { id, ...sale } = values

  const parsed = {
    ...sale,
    value: sale.value * 100
  }

  await Sale.update(id, parsed).then(() => setView({ view: "SALES" }))
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
    const entity = await Sale.findOne(this.props.id, {
      relations: ["service", "client", "professional"]
    })

    const parsed = {
      ...entity,
      professional: entity.professional.id,
      client: entity.client.id,
      service: entity.service.id,
      value: entity.value / 100
    }

    console.log("id", entity.id)

    this.setState({ entity: parsed })
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
