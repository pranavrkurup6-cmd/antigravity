import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserManagement = () => {
    const { users, addUser, updateUser, deleteUser } = useAppStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = () => {
        if (editingUser) {
            updateUser(editingUser.id, formData);
        } else {
            addUser({
                ...formData,
                status: 'Active',
                avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=random`,
                joinedDate: new Date().toISOString().split('T')[0]
            });
        }
        handleCloseModal();
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'User' });
    };

    const confirmDelete = (id: string) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete);
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Add New User
                </Button>
            </div>

            <Card>
                <div className="mb-6">
                    <Input
                        placeholder="Search users..."
                        icon={<Search className="w-5 h-5" />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 text-left">
                                <th className="pb-4 pl-4 font-semibold text-gray-500">User</th>
                                <th className="pb-4 font-semibold text-gray-500">Role</th>
                                <th className="pb-4 font-semibold text-gray-500">Status</th>
                                <th className="pb-4 font-semibold text-gray-500">Joined</th>
                                <th className="pb-4 pr-4 text-right font-semibold text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <AnimatePresence>
                                {filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <td className="py-4 pl-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${user.role === 'Admin'
                                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-500 text-sm">{user.joinedDate}</td>
                                        <td className="py-4 pr-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(user)} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => confirmDelete(user.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="p-8 text-center text-gray-500">No users found.</div>
                    )}
                </div>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingUser ? 'Edit User' : 'Add New User'}
            >
                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        label="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                        <select
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={handleCloseModal}>Cancel</Button>
                        <Button onClick={handleSubmit}>{editingUser ? 'Update' : 'Create'}</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Deletion"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this user? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete User</Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};
