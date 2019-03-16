import * as React from "react"

function Receipt({ receiptNr, customerName, date }) {
  return (
    <div
      style={{
        margin: "50px 10px"
      }}
    >
      <h1
        style={{
          textAlign: "center"
        }}
      >
        Dany Dubinski - Beauty Salon C.C. Picoas Plaza - Loja 14
      </h1>
      <div>
        <b>Recibo nº</b> {receiptNr}
      </div>
      <div style={{ display: "Flex" }}>
        <div style={{ flexGrow: 1 }}>
          <p>
            <b>Nome</b>
            <br />
            {customerName}
          </p>
        </div>
        <div>
          <p>{date}</p>
        </div>
      </div>
      <table
        style={{
          margin: "50px 0",
          width: "100%"
        }}
      >
        <thead>
          <tr>
            <th>Tratamento</th>
            <th align="right">QT</th>
            <th align="right">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>essie</td>
            <td align="right">1</td>
            <td align="right">10,00</td>
          </tr>
          <tr>
            <td>essie</td>
            <td align="right">1</td>
            <td align="right">10,00</td>
          </tr>
        </tbody>
      </table>
      <table
        style={{
          width: "100%"
        }}
      >
        <tbody>
          <tr>
            <th>SubTotal</th>
            <td align="right" colSpan={2}>
              20,00
            </td>
          </tr>
          <tr>
            <th>Desconto</th>
            <td>0%</td>
            <td align="right">0,00</td>
          </tr>
          <tr>
            <th>Total</th>
            <td align="right" colSpan={2}>
              10,00
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          margin: "50px 0",
          textAlign: "center"
        }}
      >
        <p>Obrigado e volte sempre</p>
        <p>Não serve de fatura</p>
      </div>
    </div>
  )
}

export default props => {
  return <Receipt {...props} />
}
