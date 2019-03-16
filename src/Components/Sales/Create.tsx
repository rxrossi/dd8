import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import Receipt from "./Receipt"
import * as fs from "fs"
import { remote } from "electron"
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

function print({ receiptNr, customerName, date }) {
  const win = new remote.BrowserWindow({
    width: 370,
    height: 740,
    webPreferences: {
      plugins: true
    }
  })

  win.loadURL(
    `data:text/html;charset=UTF-8,
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <div id="view">
          ${ReactDOMServer.renderToStaticMarkup(
            <Receipt
              receiptNr={receiptNr}
              customerName={customerName}
              date={date}
            />
          )}
        </div>
      </body>
    </html>
     `
  )

  setTimeout(() => {
    win.webContents.print()
    //   win.webContents.printToPDF(
    //     {
    //       pageSize: {
    //         width: 98400,
    //         height: 2250000
    //       }
    //     },
    //     (error, data) => {
    //       if (error) throw error
    //       const p = path.join(remote.app.getPath("appData"), "tempPDF.pdf")
    //       // console.log(p)
    //       fs.writeFile(p, data, error => {
    //         if (error) throw error
    //         // win.loadURL()
    //         console.log("Write PDF successfully.")
    //       })
    //     }
    //   )
  }, 500)
}

const receiptNr = "2019030001"
const customerName = "Ana Beatriz Carolina"
const date = "2019-03-21"

function Create({ setView }: { setView: setViewType }) {
  return (
    <div>
      <button
        onClick={e => {
          e.preventDefault()
          print({ receiptNr, customerName, date })
        }}
      >
        Print
      </button>
      {/* <div
        style={{
          width: 370,
          height: 740,
          border: "1px solid red"
        }}
      > */}
      {/* <Receipt
          receiptNr={receiptNr}
          customerName={customerName}
          date={date}
        /> */}
      {/* </div> */}
      <Form onSubmit={onCreate(setView)} data-test="form" />
    </div>
  )
}

export default Create
