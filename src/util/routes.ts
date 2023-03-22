import find from 'ramda/es/find'
import keys from 'ramda/es/keys'
import pipe from 'ramda/es/pipe'
import prop from 'ramda/es/prop'
import propEq from 'ramda/es/propEq'
import reduce from 'ramda/es/reduce'
import replace from 'ramda/es/replace'
import { GuestAllocation } from '../components/pages/GuestAllocation'
import { GuestReports } from '../components/pages/GuestReports'
import { PeopleHome } from '../components/pages/PeopleHome'
import { PersonDetail } from '../components/pages/PersonDetail'
import { PlaceAllocation } from '../components/pages/PlaceAllocation'
import { PlacesHome } from '../components/pages/PlacesHome'
import { Reports } from '../components/pages/Reports'
import { UserGroup } from '../generated/graphql'

export const fillRoute = (obj: Params) => (path: string) =>
  reduce((prev, next) => replace(':' + next, obj[next], prev), path, keys(obj))

export const route = (key: string, params: Params = {}) =>
  pipe(find(propEq('key', key))!, prop('path'), fillRoute(params))(routes)

export const menu: Menu = {
  [UserGroup.Admins]: [
    {
      key: 'places',
      label: 'Estabelecimentos',
      icon: 'shop',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/estabelecimentos'
        }
      ]
    },
    {
      key: 'people',
      label: 'Pessoal',
      icon: 'user',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/pessoal'
        }
      ]
    },
    {
      key: 'reports',
      label: 'Relatórios',
      icon: 'line-chart',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/relatorios'
        }
      ]
    }
  ],
  [UserGroup.Managers]: [
    {
      key: 'allocation',
      label: 'Alocação',
      icon: 'calendar',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/alocacao'
        }
      ]
    },
    {
      key: 'reports',
      label: 'Fatura',
      icon: 'dollar',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/fatura'
        }
      ]
    }
  ],
  [UserGroup.Supervisors]: [
    {
      key: 'allocation',
      label: 'Alocação',
      icon: 'calendar',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/alocacao'
        }
      ]
    }
  ],
  [UserGroup.Assistants]: [
    {
      key: 'allocation',
      label: 'Alocação',
      icon: 'calendar',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/alocacao'
        }
      ]
    },
    {
      key: 'reports',
      label: 'Fatura',
      icon: 'dollar',
      items: [
        {
          key: 'list',
          label: 'Lista',
          path: '/fatura'
        }
      ]
    }
  ]
}

export const routes: Route[] = [
  {
    key: 'places',
    path: '/estabelecimentos',
    component: PlacesHome
  },
  {
    key: 'place-allocation',
    path: '/estabelecimentos/:id',
    component: PlaceAllocation
  },
  {
    key: 'people',
    path: '/pessoal',
    component: PeopleHome
  },
  {
    key: 'person-detail',
    path: '/pessoal/:id',
    component: PersonDetail
  },
  {
    key: 'guest-allocation',
    path: '/alocacao',
    component: GuestAllocation
  },
  {
    key: 'reports',
    path: '/relatorios/:place?',
    component: Reports
  },
  {
    key: 'guest-reports',
    path: '/fatura',
    component: GuestReports
  }
]

export const adminHome = routes[0]
export const guestHome = routes[4]

type Menu = {
  [key in UserGroup]: Group[]
}

type Group = {
  key: string
  label: string
  icon: string
  items: Link[]
}

type Link = {
  key: string
  label: string
  path: string
}

type Route = {
  key: string
  path: string
  component: React.FunctionComponent
}

type Params = {
  [key: string]: string
}
