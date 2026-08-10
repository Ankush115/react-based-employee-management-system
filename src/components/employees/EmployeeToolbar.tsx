    interface EmployeeToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const EmployeeToolbar = ({
  search,
  onSearchChange,
}: EmployeeToolbarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search employees..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
};

export default EmployeeToolbar;