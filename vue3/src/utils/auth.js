import { storage } from '@/utils/storage.js'

function getToken() {
  return storage.get('token')
}

function setToken(token) {
  storage.set('token', token)
}

function removeToken() {
  storage.remove('token')
}
export { getToken, removeToken, setToken }
