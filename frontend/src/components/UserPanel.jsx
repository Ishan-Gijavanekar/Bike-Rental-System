import { useEffect, useState } from 'react';
import api from '../services/api';
import EditRoleModal from './EditRoleModal';
import ConfirmDialog from './ConfirmDialog';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchUsers = async () => {
    const { data } = await api.get('/users/get-all-users');
    setUsers(data.allUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    await api.delete(`/admin/delete-user/${confirmDeleteId}`);
    setConfirmDeleteId(null);
    fetchUsers();
  };

  const paginated = users.slice((page - 1) * limit, page * limit);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(u => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => setSelectedUser(u)} className="text-blue-600">Update Role</button>
                  <button onClick={() => setConfirmDeleteId(u._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(Math.ceil(users.length / limit)).keys()].map(i => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {selectedUser && (
        <EditRoleModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdated={fetchUsers}
        />
      )}

      {confirmDeleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default UsersPanel;