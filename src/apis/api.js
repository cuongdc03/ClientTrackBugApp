import { BASE_URL } from '../constants/httpConstants'

export const post = async (url, data) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An error occurred')
    }

    return await response.json()
  } catch (error) {
    console.error('Error during POST request:', error)
    throw error
  }
}
export const get = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An error occurred')
    }

    return await response.json()
  } catch (error) {
    console.error('Error during GET request:', error)
    throw error
  }
}
export const put = async (url, data) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An error occurred')
    }

    return await response.json()
  } catch (error) {
    console.error('Error during PUT request:', error)
    throw error
  }
}
export const remove = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An error occurred')
    }

    return await response.json()
  } catch (error) {
    console.error('Error during DELETE request:', error)
    throw error
  }
}
