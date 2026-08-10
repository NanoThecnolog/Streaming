import { debug } from '@/classes/DebugLogger'
import axios from 'axios'

export const apiTMDB = axios.create({
  baseURL: '/api/tmdb',
})
