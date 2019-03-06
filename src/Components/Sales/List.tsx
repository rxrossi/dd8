import { getRepository } from "typeorm"
import * as React from "react"
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa"
import { Sale } from "entity/Sale"
import { Table, Button as BaseButton, styled } from "reakit"
import { setViewType } from "app/Components/Router"

const Button = styled(BaseButton)`
  margin: 0 2px;
`

interface IProps {
  setView: setViewType
}

class List extends React.Component<IProps> {
  state = {
    entities: []
  }

  async componentDidMount() {
    const entities = await Sale.find({
      relations: ["service", "client", "professional"]
    })
    this.setState({ entities })
  }

  render() {
    const { entities } = this.state
    const { setView } = this.props

    return (
      <Table>
        <thead>
          <tr>
            <th>Serviço</th>
            <th>Data</th>
            <th>Cliente</th>
            <th>Profissional</th>
            <th>Valor com desconto</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {entities.map(
            ({ id, service, professional, client, value, discount, date }) => {
              return (
                <tr key={id}>
                  <td>{service.name}</td>
                  <td>{new Date(date).toString()}</td>
                  <td>{client.name}</td>
                  <td>{professional.name}</td>
                  <td align="right">
                    {((value / 100) * (100 - discount)) / 100}
                  </td>
                  <td align="right">
                    <Button
                      onClick={() =>
                        setView({
                          view: "SALES_VIEW",
                          params: {
                            id
                          }
                        })
                      }
                      data-test="view-entity"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      onClick={() =>
                        setView({
                          view: "SALES_EDIT",
                          params: {
                            id
                          }
                        })
                      }
                      palette="secondary"
                      data-test="edit-entity"
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      onClick={() =>
                        setView({
                          view: "SALES_REMOVE",
                          params: {
                            id
                          }
                        })
                      }
                      palette="danger"
                      data-test="remove-entity"
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </Table>
    )
  }
}

export default List
