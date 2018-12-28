import * as React from "react"
import * as FinalForm from "react-final-form"
import { Block, styled, Field } from "reakit"
import { palette } from "styled-tools"
import Professional from "entity/Professional"

export type onSubmitType<T> = (values: T, form: FinalForm.SubsetFormApi) => void

const FormWrapper = styled(Block)`
  max-width: 920px;
  width: 100%;
  margin: auto;
  padding: 24px;
  box-shadow: 0 0 4px 1px ${palette("shadow", 6)};
`

interface IProps<T> {
  onSubmit: onSubmitType<T>
  entity: {}
  children: React.ReactNode
}

function Form({ onSubmit, children, entity }: IProps<Professional>) {
  return (
    <FinalForm.Form onSubmit={onSubmit} initialValues={entity}>
      {({ handleSubmit }) => (
        <FormWrapper>
          <form onSubmit={handleSubmit}>{children}</form>
        </FormWrapper>
      )}
    </FinalForm.Form>
  )
}

export default Form
