import { storage } from '@/utils/storage.js'

function getToken() {
  return storage.get('token')
}

function setToken(token) {
  storage.set('token', token)
}

export { getToken, setToken }
