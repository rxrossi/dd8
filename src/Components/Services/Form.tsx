import * as React from "react"
import { Button } from "reakit"
import Field from "app/Components/Commons/Field"
import CommonForm, { onSubmitType } from "app/Components/Commons/Form"
import { Client } from "entity/Client"

interface IProps<T> {
  onSubmit: onSubmitType<T>
  entity?: {}
}

function Form({ onSubmit, entity }: IProps<Client>) {
  return (
    <CommonForm entity={entity} onSubmit={onSubmit} data-test="form">
      <Field name="name" label="Nome" />
      <Field name="value" label="Valor" type="number" />
      <Button type="submit"> Salvar </Button>
    </CommonForm>
  )
}

export default Form
