import * as localStorage from 'local-storage'
import * as queryString from 'query-string'

const { protocol, hostname, port } = window.location
const root = `${protocol}//${hostname}${port && ':' + port}/`

const oauth = () => {
  window.location.assign(process.env.AUTH_URL + root)
}

export const login = () => {
  if (window.location.hash) {
    const parsed = queryString.parse(window.location.hash)
    localStorage.set('id_token', parsed.id_token)
    history.pushState('', document.title, window.location.pathname)
  }

  const access = localStorage.get('id_token')

  if (!access) {
    oauth()
  }

  return access
}

export const logout = () => {
  localStorage.remove('hash')
  localStorage.remove('id_token')
  localStorage.remove('expires')
  oauth()
}
