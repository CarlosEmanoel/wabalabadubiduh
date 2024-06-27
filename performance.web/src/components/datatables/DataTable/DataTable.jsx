import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import util from "../../../services/util";
import { PFileThumbnail } from "../..";

const DataTable = ({
  title,
  columns,
  data,
  rowKey,
  onSelectRow,
  selectedDefault,
  selectable,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setSelectedRows(selectedDefault);
  }, [selectedDefault]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleRowSelection = (row) => {
    const selected = [...selectedRows];
    const index = selected.indexOf(row[rowKey]);
    if (index === -1) {
      selected.push(row[rowKey]);
    } else {
      selected.splice(index, 1);
    }
    setSelectedRows(selected);
    onSelectRow(selected);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
      onSelectRow([]);
    } else {
      const allRowKeys = filteredData.map((row) => row[rowKey]);
      setSelectedRows(allRowKeys);
      onSelectRow(allRowKeys);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilterText((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSort = (key, type) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction, type });
  };

  const getFilteredData = () => {
    let filtered = data;

    // Apply filters
    Object.keys(filterText).forEach((key) => {
      if (filterText[key]) {
        filtered = filtered.filter((item) => {
          const column = columns.find((col) => col.dataIndex === key);
          const value = column && column.value ? column.value(item) : item[key];
          return String(value)
            .toLowerCase()
            .includes(filterText[key].toLowerCase());
        });
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const column = columns.find((col) => col.dataIndex === sortConfig.key);
        const aValue =
          column && column.value ? column.value(a) : a[sortConfig.key];
        const bValue =
          column && column.value ? column.value(b) : b[sortConfig.key];

        if (sortConfig.type === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        } else if (sortConfig.type === "date") {
          return sortConfig.direction === "ascending"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        } else if (sortConfig.type === "boolean") {
          return sortConfig.direction === "ascending"
            ? aValue === bValue
              ? 0
              : aValue
              ? -1
              : 1
            : aValue === bValue
            ? 0
            : aValue
            ? 1
            : -1;
        } else {
          return sortConfig.direction === "ascending"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }
      });
    }

    return filtered;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const filtered = getFilteredData();
  const paginatedData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderCellContent = (column, row) => {
    if (column.type === "date") {
      return row[column.dataIndex]
        ? util.getDateView(row[column.dataIndex])
        : "";
    }
    if (column.type === "img") {
      return <PFileThumbnail fileName={column.path.concat(row.id)} />;
    }
    if (column.value) {
      return typeof column.value === "function"
        ? column.value(row)
        : column.value;
    }
    if (column.cell) {
      return column.cell(row);
    }
    return row[column.dataIndex];
  };

  return (
    <div className="w-full">
      <div className="mb-4 border-b-2 text-4xl font-semibold text-gray-900 border-gray-200 select-none">
        <h2>{title}</h2>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 select-none">
            {selectable && (
              <th className="px-4 py-2 border border-gray-300">
                <input
                  type="checkbox"
                  checked={selectedRows.length === filteredData.length}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.dataIndex}
                className="px-4 py-2 border border-gray-300 font-semibold text-gray-800"
                style={{ width: column.width || "auto" }}
              >
                <div
                  onClick={() =>
                    column.sortable && handleSort(column.dataIndex, column.type)
                  }
                  className="cursor-pointer"
                >
                  {column.name}
                  {sortConfig.key === column.dataIndex
                    ? sortConfig.direction === "ascending"
                      ? " ▲"
                      : " ▼"
                    : null}
                </div>
                {column.filterable && (
                  <div>
                    <input
                      type="text"
                      placeholder={`Filtrar ${column.name}`}
                      value={filterText[column.dataIndex] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.dataIndex, e.target.value)
                      }
                      className="mt-1 w-full p-1 border border-gray-300 rounded font-semibold"
                    />
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row[rowKey]}
              className={
                selectedRows.includes(row[rowKey]) ? "bg-gray-200" : ""
              }
            >
              {selectable && (
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row[rowKey])}
                    onChange={() => handleRowSelection(row)}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={column.dataIndex}
                  className="px-4 py-2 border border-gray-300"
                  style={{ width: column.width || "auto" }}
                >
                  {renderCellContent(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex justify-between select-none">
        <button
          className="cursor-pointer hover:text-gray-700"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {Math.ceil(filtered.length / pageSize)}
        </span>
        <button
          className="cursor-pointer hover:text-gray-700"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filtered.length / pageSize)}
        >
          Próxima
        </button>
      </div>
      <div className="my-2 select-none">
        <label>
          Linhas por página:
          <select
            className="ml-2 border-2 rounded-sm"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={filteredData.length}>Todas</option>
          </select>
        </label>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["text", "number", "date", "boolean"]),
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      cell: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  rowKey: PropTypes.string.isRequired,
  onSelectRow: PropTypes.func,
  selectedDefault: PropTypes.array,
  selectable: PropTypes.bool,
};

DataTable.defaultProps = {
  onSelectRow: () => {},
  selectedDefault: [],
  selectable: false,
};

export default DataTable;
