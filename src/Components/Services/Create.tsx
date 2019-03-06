import * as React from "react"
import { Service } from "entity/Service"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onCreate: (
  setView: setViewType
) => onSubmitType<Service> = setView => async (values, formApi) => {
  await Service.create(values)
    .save()
    .then(() => {
      formApi.reset()
      setView({ view: "SERVICES" })
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
