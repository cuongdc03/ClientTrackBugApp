import React, { useEffect, useState } from 'react'
import { ENDPOINTS } from '../../apis/constants'
import { get, post, put, remove } from '../../apis/api'
import BugDataGrid from '../../component/BugTable/BugTable'
import { useParams } from 'react-router-dom'
import { Box, Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

const severityOptions = ['low', 'medium', 'high']
const statusOptions = ['open', 'in-progress', 'closed']

const BugsPage = () => {
  const { projectId } = useParams()
  const [bugs, setBugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [editingBug, setEditingBug] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: '',
    status: '',
    assignedUser: ''
  })

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await get(`${ENDPOINTS.BUGFROMPROJECT}${projectId}`)
        setBugs(data.bugs)
      } catch (error) {
        setError(error.message || 'Failed to fetch bugs')
      } finally {
        setLoading(false)
      }
    }

    fetchBugs()
  }, [projectId])

  const handleCreate = () => {
    setFormData({ title: '', description: '', severity: '', status: '', assignedUser: '' })
    setEditingBug(null)
    setOpen(true)
  }

  const handleEdit = (bug) => {
    setFormData({
      title: bug.title,
      description: bug.description,
      severity: bug.severity,
      status: bug.status,
      assignedUser: bug.assignedUser || ''
    })
    setEditingBug(bug)
    setOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await remove(`${ENDPOINTS.BUG}/${id}`)
      setBugs(bugs.filter((bug) => bug.id !== id))
    } catch (error) {
      console.error('Error deleting bug:', error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setFormData({ title: '', description: '', severity: '', status: '', assignedUser: '' })
  }

  const handleSubmit = async () => {
    try {
      if (editingBug) {
        const updatedBug = await put(`${ENDPOINTS.BUG}/${editingBug.id}`, formData)
        setBugs(bugs.map((bug) => (bug.id === updatedBug.id ? updatedBug : bug)))
      } else {
        const newBug = await post(ENDPOINTS.BUG, formData)
        setBugs([...bugs, newBug])
      }
      handleClose()
    } catch (error) {
      console.error('Error saving bug:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading) {
    return <div className='text-center py-4'>Loading...</div>
  }

  if (error) {
    return <div className='text-center py-4 text-red-500'>{error}</div>
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <Button onClick={handleCreate} variant='contained' className='bg-blue-500 hover:bg-blue-600'>
          Create New Bug
        </Button>
      </div>
      <BugDataGrid bugs={bugs} handleEdit={handleEdit} handleDelete={handleDelete} />

      <Modal open={open} onClose={handleClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
        <Box
          className='bg-white p-4 rounded-lg shadow-lg'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400
          }}
        >
          <h2 id='modal-title' className='text-lg font-medium mb-4'>
            {editingBug ? 'Edit Bug' : 'Create New Bug'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className='space-y-8'
          >
            <TextField
              name='title'
              label='Title'
              value={formData.title}
              onChange={handleChange}
              fullWidth
              className='mb-4'
            />
            <TextField
              name='description'
              label='Description'
              value={formData.description}
              onChange={handleChange}
              fullWidth
              className='mb-4'
              multiline
              rows={4}
            />
            <FormControl fullWidth className='mb-4'>
              <InputLabel id='severity-label'>Severity</InputLabel>
              <Select
                labelId='severity-label'
                name='severity'
                value={formData.severity}
                onChange={handleSelectChange}
                label='Severity'
              >
                {severityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth className='mb-4'>
              <InputLabel id='status-label'>Status</InputLabel>
              <Select
                labelId='status-label'
                name='status'
                value={formData.status}
                onChange={handleSelectChange}
                label='Status'
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name='assignedUser'
              label='Assigned User'
              value={formData.assignedUser.name}
              onChange={handleChange}
              fullWidth
              className='mb-4'
            />
            <div className='flex justify-end space-x-2'>
              <Button onClick={handleClose} variant='outlined' className='hover:bg-gray-100'>
                Cancel
              </Button>
              <Button type='submit' variant='contained' className='bg-blue-500 hover:bg-blue-600'>
                {editingBug ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default BugsPage
