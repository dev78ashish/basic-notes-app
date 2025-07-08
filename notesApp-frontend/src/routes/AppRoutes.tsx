import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/signup' element={<Signup />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;