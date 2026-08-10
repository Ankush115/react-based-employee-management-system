interface EmployeeToolbarProps {
  search: string;
  department: string;
  role: string;
  departments: string[];
  roles: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onClearFilters: () => void;
}

const EmployeeToolbar = ({
  search,
  department,
  role,
  departments,
  roles,
  onSearchChange,
  onDepartmentChange,
  onRoleChange,
  onClearFilters,
}: EmployeeToolbarProps) => {
  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search employees..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      {/* Department */}
      <select
        value={department}
        onChange={(event) => onDepartmentChange(event.target.value)}
      >
        <option value="">All Departments</option>

        {departments.map((departmentName) => (
          <option key={departmentName} value={departmentName}>
            {departmentName}
          </option>
        ))}
      </select>

      {/* Role */}
      <select
        value={role}
        onChange={(event) => onRoleChange(event.target.value)}
      >
        <option value="">All Roles</option>

        {roles.map((roleName) => (
          <option key={roleName} value={roleName}>
            {roleName}
          </option>
        ))}
      </select>

      {/* Clear */}
      <button onClick={onClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default EmployeeToolbar;