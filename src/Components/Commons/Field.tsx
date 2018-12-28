import * as React from "react"
import * as FinalForm from "react-final-form"
import { Field as ReakitField, Input, Label, styled } from "reakit"

const StyledField = styled(ReakitField)`
  margin: 15px 0;
`

interface IProps {
  name: string
  label: string
  type?: string
}

function Field({ label, type, ...rest }: IProps) {
  return (
    <FinalForm.Field {...rest}>
      {({ input }) => (
        <StyledField>
          <Label htmlFor={rest.name}>{label}</Label>
          <Input type={type} {...input} />
        </StyledField>
      )}
    </FinalForm.Field>
  )
}

export default Field
