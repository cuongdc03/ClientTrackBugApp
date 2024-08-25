import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton, Button, Modal, Box, TextField, Icon } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { FaBug } from 'react-icons/fa'
import moment from 'moment'
import { ENDPOINTS } from '../../apis/constants'
import { get, post, put, remove } from '../../apis/api'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const ProjectTable = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const navigate = useNavigate() // Initialize useNavigate

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await get(ENDPOINTS.PROJECT)
        setProjects(data.projects)
      } catch (error) {
        setError(error.message || 'Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleCreate = () => {
    setFormData({ name: '', description: '' })
    setEditingProject(null)
    setOpen(true)
  }

  const handleEdit = (project) => {
    setFormData({ name: project.name, description: project.description })
    setEditingProject(project)
    setOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await remove(`${ENDPOINTS.PROJECT}/${id}`)
      setProjects(projects.filter((project) => project.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setFormData({ name: '', description: '' })
  }

  const handleSubmit = async () => {
    try {
      if (editingProject) {
        const updatedProject = await put(`${ENDPOINTS.PROJECT}/${editingProject.id}`, formData)
        setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
      } else {
        const newProject = await post(ENDPOINTS.PROJECT, formData)
        setProjects([...projects, newProject])
      }
      handleClose()
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRowClick = (params) => {
    navigate(`/bugs/${params.row.id}`) // Navigate to the bugs page for the selected project
  }

  if (loading) {
    return <div className='text-center py-4'>Loading...</div>
  }

  if (error) {
    return <div className='text-center py-4 text-red-500'>{error}</div>
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'description', headerName: 'Description', width: 450 },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 250,
      renderCell: (params) => moment(params.value).format('MMMM D, YYYY')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: (params) => (
        <div className='flex space-x-2'>
          <IconButton onClick={() => handleEdit(params.row)} aria-label='edit'>
            <EditIcon className='text-yellow-500 hover:text-yellow-600' />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} aria-label='delete'>
            <DeleteIcon className='text-red-500 hover:text-red-600' />
          </IconButton>
          <IconButton onClick={() => handleRowClick(params)} aria-label='view'>
            <FaBug className='text-green-500 hover:text-green-600'>visibility</FaBug>
          </IconButton>
        </div>
      )
    }
  ]

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <Button onClick={handleCreate} variant='contained' className='bg-blue-500 hover:bg-blue-600'>
          Create New
        </Button>
      </div>
      <div className='h-96 bg-gray-100 p-4 rounded-lg'>
        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          onRowClick={handleRowClick} // Handle row click
          className='bg-white'
        />
      </div>

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
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className='space-y-8'
          >
            <TextField
              name='name'
              label='Project Name'
              value={formData.name}
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
            <div className='flex justify-end space-x-2'>
              <Button onClick={handleClose} variant='outlined' className='hover:bg-gray-100'>
                Cancel
              </Button>
              <Button type='submit' variant='contained' className='bg-blue-500 hover:bg-blue-600'>
                {editingProject ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default ProjectTable
