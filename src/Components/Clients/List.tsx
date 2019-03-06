import * as React from "react"
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa"
import { Client } from "entity/Client"
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
    const entities = await Client.find()
    this.setState({ entities })
  }

  render() {
    const { entities } = this.state
    const { setView } = this.props

    return (
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {entities.map(({ id, name }) => {
            return (
              <tr key={id}>
                <td>{name}</td>
                <td align="right">
                  <Button
                    onClick={() =>
                      setView({
                        view: "CLIENTS_VIEW",
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
                        view: "CLIENTS_EDIT",
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
                        view: "CLIENTS_REMOVE",
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
          })}
        </tbody>
      </Table>
    )
  }
}

export default List
