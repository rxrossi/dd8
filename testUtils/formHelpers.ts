import * as Enzyme from "enzyme"

export function submitForm(wrapper: Enzyme.ReactWrapper) {
  wrapper.find("form").simulate("submit")
}

export function changeFieldByLabel(
  wrapper: Enzyme.ReactWrapper,
  label: string,
  value: string | number
) {
  const labelComponent = wrapper.findWhere(
    item => item.text() === label && item.type() === "label"
  )

  const input = wrapper.find(`input[name='${labelComponent.prop("htmlFor")}']`)

  const inputName = input.prop("name")

  input.simulate("change", { target: { value, name: inputName } })
}

export function getFields(wrapper: Enzyme.ReactWrapper) {
  wrapper.update()

  return wrapper.find("input").map(input => ({
    name: input.prop("name"),
    value: input.prop("value"),
    label: wrapper
      .findWhere(item => {
        return (
          item.type() === "label" && item.prop("htmlFor") === input.prop("name")
        )
      })
      .text()
  }))
}

export function getFieldsWithValues(wrapper: Enzyme.ReactWrapper) {
  return getFields(wrapper).filter(({ value }) => value)
}
