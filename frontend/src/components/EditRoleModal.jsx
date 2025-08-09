import { useState } from 'react';
import api from '../services/api';

const EditRoleModal = ({ user, onClose, onUpdated }) => {
  const [role, setRole] = useState(user.role);

  const handleUpdate = async () => {
    try {
      await api.put(`/users/update-role/${user._id}`, { role });
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Role update failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h3 className="text-xl font-bold mb-4">Update Role</h3>
        <select value={role} onChange={e => setRole(e.target.value)} className="input-field mb-4">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;