import { Button } from '@/components/ui/button';
import React from 'react';
import {LogOut} from 'lucide-react'
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const Dashboard: React.FC = () => {

  const dispatch = useDispatch();

  const handleLogout=()=>{
    dispatch(logout());
  }

  return (
    <div>
      <Button onClick={handleLogout}><LogOut /> Logout</Button>
    </div>
  );
};

export default Dashboard;