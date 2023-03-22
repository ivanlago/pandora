import { LocaleProvider } from 'antd'
import antLocale from 'antd/lib/locale-provider/pt_BR'
import { locale } from 'moment'
import 'moment/locale/pt-br'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { render } from 'react-dom'
import { App } from './src/App'
import { APIProvider } from './src/util/api'
locale('pt-br', {
  weekdaysMin: 'Dom Seg Ter Qua Qui Sex Sáb'.split(' ')
})

render(
  <LocaleProvider locale={antLocale}>
    <APIProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </APIProvider>
  </LocaleProvider>,
  document.getElementById('root')
)
