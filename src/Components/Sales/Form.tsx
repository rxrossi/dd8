import * as React from "react"
import { FormSpy } from "react-final-form"
import { Button, Paragraph, styled, Group } from "reakit"
import CommonForm, { onSubmitType } from "app/Components/Commons/Form"
import { Professional } from "entity/Professional"
import { Client } from "entity/Client"
import { Service } from "entity/Service"
import { Sale } from "entity/Sale"
import Field from "app/Components/Commons/Field"
import EntitySelect from "app/Components/Commons/EntitySelect"

const Joiner = styled.div`
  display: flex;
`
interface IProps<T> {
  onSubmit: onSubmitType<T>
  entity?: {}
}

function Form({ onSubmit, entity }: IProps<Sale>) {
  return (
    <CommonForm entity={entity} onSubmit={onSubmit} data-test="form">
      <Group>
        <EntitySelect entity={Client} label="Cliente" name="client" />
        <EntitySelect
          entity={Professional}
          label="Profissional"
          name="professional"
        />
        <FormSpy subscription={{}}>
          {({ form }) => {
            return (
              <EntitySelect
                label="Serviço"
                name="service"
                entity={Service}
                onChange={entity => {
                  if (entity) {
                    form.change("value", Number(entity.value))
                  } else {
                    form.change("value", null)
                  }
                }}
              />
            )
          }}
        </FormSpy>
      </Group>
      <Group>
        <Field name="value" label="Valor" type="number" />
        <Field name="discount" label="Desconto" type="number" />
      </Group>
      <Field name="date" label="Data" type="date" />
      <Field name="notes" label="Notas" type="textarea" />
      <FormSpy>
        {({ values }) => {
          return (
            <Paragraph>
              Valor total:{" "}
              {(values.value || 0) -
                (((values.value || 0) / 100) * values.discount || 0)}
            </Paragraph>
          )
        }}
      </FormSpy>
      <Button type="submit"> Salvar </Button>
    </CommonForm>
  )
}

export default Form
