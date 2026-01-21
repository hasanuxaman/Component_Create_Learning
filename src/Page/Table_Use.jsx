// App.jsx
import React, { useState, useEffect } from 'react';
import '../Table.css';
import EnhancedTable from '../Components/EnhancedTable';

const Table_Use = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, status: 'Active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, status: 'Inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 23, status: 'Active' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 38, status: 'Pending' },
        { id: 6, name: 'Diana Prince', email: 'diana@example.com', age: 29, status: 'Active' },
        { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', age: 41, status: 'Active' },
        { id: 8, name: 'Fiona Gallagher', email: 'fiona@example.com', age: 34, status: 'Inactive' },
        { id: 9, name: 'George Miller', email: 'george@example.com', age: 52, status: 'Active' },
        { id: 10, name: 'Hannah Baker', email: 'hannah@example.com', age: 27, status: 'Pending' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    { 
      header: 'ID', 
      accessor: 'id', 
      sortable: true,
      width: '80px'
    },
    { 
      header: 'Name', 
      accessor: 'name', 
      sortable: true,
      render: (value, row) => (
        <div className="user-cell">
          <div className="avatar">{row.name.charAt(0)}</div>
          <div>
            <div className="user-name">{value}</div>
            <div className="user-email">{row.email}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Age', 
      accessor: 'age', 
      sortable: true,
      render: (value) => <span className="age-badge">{value}</span>
    },
    { 
      header: 'Status', 
      accessor: 'status', 
      sortable: true,
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      sortable: false,
      render: (_, row) => (
        <div className="actions">
          <button className="btn-edit" onClick={() => handleEdit(row)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => handleDelete(row.id)}>
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleEdit = (user) => {
    alert(`Editing user: ${user.name}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Table Component Demo</h1>
        <p>A feature-rich table component for learning</p>
      </header>
      
      <main className="app-content">
        <div className="card">
          <div className="card-header">
            <h2>User Management</h2>
            <div className="card-stats">
              Total: {users.length} users
            </div>
          </div>
          
          {loading ? (
            <div className="loading-state">
              Loading users...
            </div>
          ) : (
            <EnhancedTable
              columns={columns}
              data={users}
              pageSize={5}
              searchable={true}
              sortable={true}
              pagination={true}
              className="user-table"
            />
          )}
        </div>
        
        <div className="features">
          <h3>Features Implemented:</h3>
          <ul>
            <li>✓ Sorting (ascending/descending)</li>
            <li>✓ Pagination with page numbers</li>
            <li>✓ Global search</li>
            <li>✓ Row selection</li>
            <li>✓ Custom cell rendering</li>
            <li>✓ Responsive design</li>
            <li>✓ Loading states</li>
            <li>✓ Hover effects</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Table_Use;