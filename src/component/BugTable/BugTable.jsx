import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
const BugDataGrid = ({ bugs, handleEdit, handleDelete }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'assignedUser',
      headerName: 'Assigned User',
      width: 200,
      valueGetter: (params) => {
        return params.name
      }
    },
    { field: 'severity', headerName: 'Severity', width: 150 },

    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => <span className={`status-${params.value}`}>{params.value}</span>
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className='flex space-x-2'>
          <IconButton onClick={() => handleEdit(params.row)} aria-label='edit'>
            <EditIcon className='text-yellow-500 hover:text-yellow-600' />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} aria-label='delete'>
            <DeleteIcon className='text-red-500 hover:text-red-600' />
          </IconButton>
        </div>
      )
    }
  ]

  const rows = bugs.map((bug) => ({
    id: bug.id,
    title: bug.title,
    description: bug.description,
    status: bug.status,
    severity: bug.severity,
    created_at: bug.created_at,
    updated_at: bug.updated_at,
    assigned_to: bug.assigned_to,
    assignedUser: bug.assignedUser
  }))

  return (
    <div className='h-96 bg-gray-100 p-4 rounded-lg'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}

export default BugDataGrid
