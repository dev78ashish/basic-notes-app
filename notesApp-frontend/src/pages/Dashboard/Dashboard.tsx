import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { Apis } from '@/services/api';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

import AllNotes from './components/AllNotes';
import AddNote from './components/AddNote'; // 👈 Import AddNote

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(Apis.util.resetApiState());
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      {/* Add Note Form */}
      <section className="mb-8">
        <AddNote />
      </section>

      {/* All Notes Listing */}
      <section>
        <AllNotes />
      </section>
    </div>
  );
};

export default Dashboard;
