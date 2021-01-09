import axios from 'axios'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
