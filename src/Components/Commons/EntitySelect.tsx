import * as React from "react"
import { ObjectLiteral } from "typeorm"
import { Field as FinalFormField } from "react-final-form"
import { Field as ReakitField, Label, Input, styled } from "reakit"

const StyledField = styled(ReakitField)`
  margin: 16px 8px;
`

interface IProps {
  entity: ObjectLiteral
  label: string
  name: string
  onChange?: Function
}

class EntitySelect extends React.Component<IProps> {
  state = {
    entities: []
  }

  static defaultProps = {
    onChange: () => null
  }

  componentDidMount() {
    this.props.entity.find().then(entities => {
      this.setState({ entities })
    })
  }

  render() {
    const { entities } = this.state
    return (
      <StyledField>
        <Label>{this.props.label}</Label>
        <FinalFormField name={this.props.name}>
          {({ input }) => {
            return (
              <Input
                as="select"
                {...input}
                onChange={e => {
                  input.onChange(e)
                  const entity = entities.find(
                    entity => entity.id === Number(e.currentTarget.value)
                  )
                  this.props.onChange(entity)
                }}
              >
                <option value={null} />
                {entities.map(entity => (
                  <option key={entity.id} value={entity.id}>
                    {entity.name}
                  </option>
                ))}
              </Input>
            )
          }}
        </FinalFormField>
      </StyledField>
    )
  }
}

export default EntitySelect
