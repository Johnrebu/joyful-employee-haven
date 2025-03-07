
import { useState, useMemo } from 'react';
import { Search, Users, DollarSign, MapPin, ArrowUpDown, UserPlus } from 'lucide-react';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Nathanael",
      age: 18,
      location: "Sealiyur",
      salary: 1000,
      department: "Engineering",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Jonathan",
      age: 23,
      location: "Bangalore",
      salary: 2000,
      department: "Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Jeyakumari",
      age: 46,
      location: "Ambattur",
      salary: 3000,
      department: "Marketing",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Cecil",
      age: 47,
      location: "Tambaram",
      salary: 5000,
      department: "Sales",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [viewMode, setViewMode] = useState('cards');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = useMemo(() => 
    Array.from(new Set(employees.map(emp => emp.department))),
    [employees]
  );

  const statistics = useMemo(() => ({
    totalEmployees: employees.length,
    averageSalary: Math.round(employees.reduce((acc, emp) => acc + emp.salary, 0) / employees.length),
    averageAge: Math.round(employees.reduce((acc, emp) => acc + emp.age, 0) / employees.length),
    locations: Array.from(new Set(employees.map(emp => emp.location))).length
  }), [employees]);

  const handleSort = (column) => {
    const direction = column === sortColumn ? -sortDirection : 1;
    setSortColumn(column);
    setSortDirection(direction);

    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[column] < b[column]) return -1 * direction;
      if (a[column] > b[column]) return 1 * direction;
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  const filteredEmployees = useMemo(() => 
    employees.filter(emp => 
      (filterDepartment === 'all' || emp.department === filterDepartment) &&
      Object.values(emp).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    ),
    [employees, searchQuery, filterDepartment]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Employee Directory</h1>
        <p className="text-gray-600">Manage and view all employee information</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Average Salary</p>
              <p className="text-2xl font-bold text-gray-800">${statistics.averageSalary}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Average Age</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.averageAge}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Locations</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.locations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <label htmlFor="departmentFilter" className="sr-only">Filter by Department</label>
        <select
          id="departmentFilter"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'table'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'cards'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                {['age', 'location', 'salary', 'department'].map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={emp.image}
                        alt={emp.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${emp.salary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {emp.department}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-xl font-semibold">{emp.name}</h3>
                  <p className="text-white/80">{emp.department}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold">{emp.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-semibold">${emp.salary}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{emp.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Employee Button */}
      <button title="Add Employee" className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
        <UserPlus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default EmployeeDirectory;
