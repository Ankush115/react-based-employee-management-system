import { useEffect, useState } from "react";
import type { Employee } from "../../types/employee";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import EmployeeToolbar from "../../components/Employees/EmployeeToolbar";
import EmployeePagination from "../../components/Employees/EmployeePagination";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchEmployees,
  deleteEmployee,
} from "../../store/slices/employeeSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import type { SortField, SortDirection } from "../../types/employeeTable";

const ITEMS_PER_PAGE = 5;

const Employees = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };
  const dispatch = useAppDispatch();

  const { employees, loading, error } = useAppSelector(
    (state) => state.employees,
  );

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const [sortField, setSortField] = useState<SortField>("name");

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  // Get unique departments
  const departments = Array.from(
    new Set(employees.map((employee) => employee.company.department)),
  );

  // Get unique roles
  const roles = Array.from(
    new Set(employees.map((employee) => employee.company.title)),
  );

  // Search + Filter
  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = search.toLowerCase().trim();

    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm);

    const matchesDepartment =
      !department || employee.company.department === department;

    const matchesRole = !role || employee.company.title === role;

    return matchesSearch && matchesDepartment && matchesRole;
  });

  // Sorting
  const getEmployeeName = (employee: Employee) => {
    return `${employee.firstName} ${employee.lastName}`;
  };

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let valueA = "";
    let valueB = "";

    switch (sortField) {
      case "name":
        valueA = getEmployeeName(a);
        valueB = getEmployeeName(b);
        break;

      case "email":
        valueA = a.email;
        valueB = b.email;
        break;

      case "department":
        valueA = a.company.department;
        valueB = b.company.department;
        break;

      case "role":
        valueA = a.company.title;
        valueB = b.company.title;
        break;

      case "company":
        valueA = a.company.name;
        valueB = b.company.name;
        break;

      case "phone":
        valueA = a.phone;
        valueB = b.phone;
        break;

      case "location":
        valueA = a.address.city;
        valueB = b.address.city;
        break;
    }

    const comparison = valueA.localeCompare(valueB, undefined, {
      sensitivity: "base",
    });

    return sortDirection === "asc" ? comparison : -comparison;
  });
  const handleDelete = async (employeeId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteEmployee(employeeId)).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedEmployees = sortedEmployees.slice(startIndex, endIndex);
  const showingFrom = sortedEmployees.length === 0 ? 0 : startIndex + 1;

  const showingTo = Math.min(endIndex, sortedEmployees.length);

  // Sorting handler
  const handleSort = (field: SortField) => {
    setCurrentPage(1);

    if (sortField === field) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setDepartment("");
    setRole("");

    setCurrentPage(1);

    setSortField("name");
    setSortDirection("asc");
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          dispatch(fetchEmployees());
        }}
      />
    );
  }

  return (
    <div className="employees-page">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p className="summary-text">
            Showing {showingFrom} - {showingTo} of {sortedEmployees.length}{" "}
            employees
          </p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/employees/add")}
          >
            Add Employee
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <EmployeeToolbar
        search={search}
        department={department}
        role={role}
        departments={departments}
        roles={roles}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onDepartmentChange={(value) => {
          setDepartment(value);
          setCurrentPage(1);
        }}
        onRoleChange={(value) => {
          setRole(value);
          setCurrentPage(1);
        }}
        onClearFilters={clearFilters}
      />
      {sortedEmployees.length === 0 ? (
        <EmptyState message="No employees found." />
      ) : (
        <>
          <EmployeeTable
            employees={paginatedEmployees}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onDelete={handleDelete}
          />

          <EmployeePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Employees;
