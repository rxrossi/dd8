import * as React from "react"
import { Sale } from "entity/Sale"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onCreate: (
  setView: setViewType
) => onSubmitType<Sale> = setView => async (values, formApi) => {
  await Sale.create({
    ...values,
    value: values.value * 100
  })
    .save()
    .then(() => {
      formApi.reset()
      setView({ view: "SALES" })
    })
}

function Create({ setView }: { setView: setViewType }) {
  return (
    <div>
      <Form onSubmit={onCreate(setView)} data-test="form" />
    </div>
  )
}

export default Create
