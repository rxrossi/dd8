import * as React from "react"
import Client from "entity/Client"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onCreate: (
  setView: setViewType
) => onSubmitType<Client> = setView => async (values, formApi) => {
  await Client.create(values)
    .save()
    .then(() => {
      formApi.reset()
      setView({ view: "CLIENTS" })
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
