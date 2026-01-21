// EnhancedTable.jsx
import React, { useState, useMemo, useEffect } from 'react';
import './EnhancedTable.css';

const EnhancedTable = ({
  columns,
  data: initialData,
  pageSize = 10,
  searchable = true,
  sortable = true,
  pagination = true,
  className = ''
}) => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  // Update data when initialData changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Handle search
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row => 
      columns.some(column => {
        const value = row[column.accessor];
        return value && 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Handle sorting
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData];
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  }, [filteredData, sortConfig]);

  // Handle pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Handle sort click
  const handleSort = (accessor) => {
    let direction = 'asc';
    
    if (sortConfig.key === accessor && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: accessor, direction });
  };

  // Handle row selection
  const handleRowSelect = (rowId) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      const allIds = paginatedData.map(row => row.id);
      setSelectedRows(allIds);
    }
  };

  // Format column header
  const getSortIndicator = (accessor) => {
    if (sortConfig.key !== accessor) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={`enhanced-table ${className}`}>
      {/* Search Bar */}
      {searchable && (
        <div className="table-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-count">
            {filteredData.length} records found
          </span>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((column) => (
                <th 
                  key={column.accessor}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.accessor)}
                  className={`
                    ${sortable && column.sortable !== false ? 'sortable' : ''}
                    ${sortConfig.key === column.accessor ? `sorted-${sortConfig.direction}` : ''}
                  `}
                  style={{ width: column.width }}
                >
                  <div className="header-content">
                    <span>{column.header}</span>
                    {sortable && column.sortable !== false && (
                      <span className="sort-indicator">
                        {getSortIndicator(column.accessor)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr 
                key={row.id || index}
                className={selectedRows.includes(row.id) ? 'selected' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.accessor}>
                    {column.render 
                      ? column.render(row[column.accessor], row)
                      : row[column.accessor]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="table-pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => {
                // Add ellipsis for large page ranges
                if (index > 0 && page - array[index - 1] > 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className="ellipsis">...</span>
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'active' : ''}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? 'active' : ''}
                  >
                    {page}
                  </button>
                );
              })}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          
          <div className="page-info">
            Page {currentPage} of {totalPages} • 
            Showing {paginatedData.length} of {sortedData.length} records
          </div>
        </div>
      )}
      
      {/* Selection info */}
      {selectedRows.length > 0 && (
        <div className="selection-info">
          {selectedRows.length} row(s) selected
        </div>
      )}
    </div>
  );
};

export default EnhancedTable;