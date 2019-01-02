import * as React from "react"
import { Button } from "reakit"
import Field from "app/Components/Commons/Field"
import CommonForm, { onSubmitType } from "app/Components/Commons/Form"
import Professional from "entity/Professional"
import Client from "entity/Client"
import Service from "entity/Service"
import EntitySelect from "app/Components/Commons/EntitySelect"

interface IProps<T> {
  onSubmit: onSubmitType<T>
  entity?: {}
}

function Form({ onSubmit, entity }: IProps<Professional>) {
  return (
    <CommonForm entity={entity} onSubmit={onSubmit} data-test="form">
      <EntitySelect entity={Service} label="Serviço" name="service" />
      <EntitySelect
        entity={Professional}
        label="Profissional"
        name="professional"
      />
      <EntitySelect entity={Client} label="Cliente" name="client" />
      <Button type="submit"> Salvar </Button>
    </CommonForm>
  )
}

export default Form
