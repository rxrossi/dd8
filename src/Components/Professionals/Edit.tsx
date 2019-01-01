import * as React from "react"
import Professional from "entity/Professional"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onEdit: (
  setView: setViewType
) => onSubmitType<Professional> = setView => async (values, formApi) => {
  const { id, ...professional } = values

  await Professional.update(id, professional).then(() =>
    setView({ view: "PROFESSIONALS" })
  )
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
    const entity = await Professional.findOne(this.props.id)
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
