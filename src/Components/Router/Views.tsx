import * as React from "react"
import Dashboard from "app/Components/Dashboard"
import Professionals from "../Professionals"
import ProfessionalsCreate from "../Professionals/Create"
import ProfessionalsEdit from "../Professionals/Edit"
import ProfessionalsView from "../Professionals/View"
import ProfessionalsRemove from "../Professionals/Remove"
import Clients from "../Clients"
import ClientsCreate from "../Clients/Create"
import ClientsEdit from "../Clients/Edit"
import ClientsView from "../Clients/View"
import ClientsRemove from "../Clients/Remove"

type ViewName =
  | "DASHBOARD"
  | "SALES"
  | "PROFESSIONALS"
  | "PROFESSIONALS_CREATE"
  | "PROFESSIONALS_EDIT"
  | "PROFESSIONALS_REMOVE"
  | "PROFESSIONALS_VIEW"
  | "CLIENTS"
  | "CLIENTS_CREATE"
  | "CLIENTS_EDIT"
  | "CLIENTS_REMOVE"
  | "CLIENTS_VIEW"
  | "CLIENTS"

type View = {
  component: any
  label: string
  showButtonInNav: boolean
}

type Views = { [k in ViewName]: View }

const Views: Views = {
  DASHBOARD: {
    component: Dashboard,
    label: "Dashboard",
    showButtonInNav: true
  },
  SALES: {
    component: () => <div>"Vendas"</div>,
    label: "Vendas",
    showButtonInNav: true
  },
  PROFESSIONALS: {
    component: Professionals,
    label: "Profissionais",
    showButtonInNav: true
  },
  PROFESSIONALS_CREATE: {
    component: ProfessionalsCreate,
    label: "Criar profissional",
    showButtonInNav: false
  },
  PROFESSIONALS_EDIT: {
    component: ProfessionalsEdit,
    label: "Editar profissional",
    showButtonInNav: false
  },
  PROFESSIONALS_VIEW: {
    component: ProfessionalsView,
    label: "Ver detalhes de um profissional",
    showButtonInNav: false
  },
  PROFESSIONALS_REMOVE: {
    component: ProfessionalsRemove,
    label: "Remover profissional",
    showButtonInNav: false
  },
  CLIENTS: {
    component: Clients,
    label: "Clientes",
    showButtonInNav: true
  },
  CLIENTS_CREATE: {
    component: ClientsCreate,
    label: "Criar clienhe",
    showButtonInNav: false
  },
  CLIENTS_EDIT: {
    component: ClientsEdit,
    label: "Editar cliente",
    showButtonInNav: false
  },
  CLIENTS_VIEW: {
    component: ClientsView,
    label: "Ver detalhes de um cliente",
    showButtonInNav: false
  },
  CLIENTS_REMOVE: {
    component: ClientsRemove,
    label: "Remover cliente",
    showButtonInNav: false
  }
}

export { Views, ViewName }
