import * as React from "react"
import Dashboard from "app/Components/Dashboard"
import Professionals from "../Professionals"
import ProfessionalsCreate from "../Professionals/Create"
import ProfessionalsEdit from "../Professionals/Edit"
import ProfessionalsView from "../Professionals/View"
import ProfessionalsRemove from "../Professionals/Remove"

type ViewName =
  | "DASHBOARD"
  | "SALES"
  | "PROFESSIONALS"
  | "PROFESSIONALS_CREATE"
  | "PROFESSIONALS_EDIT"
  | "PROFESSIONALS_REMOVE"
  | "PROFESSIONALS_VIEW"
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
    component: () => <div>"Clientes"</div>,
    label: "Clientes",
    showButtonInNav: true
  }
}

export { Views, ViewName }
