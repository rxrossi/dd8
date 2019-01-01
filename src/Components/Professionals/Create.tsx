import * as React from "react"
import Professional from "entity/Professional"
import Form from "./Form"
import { onSubmitType } from "app/Components/Commons/Form"
import { setViewType } from "app/Components/Router"

const onCreate: (
  setView: setViewType
) => onSubmitType<Professional> = setView => async (values, formApi) => {
  await Professional.create(values)
    .save()
    .then(() => {
      formApi.reset()
      setView({ view: "PROFESSIONALS" })
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
