import {
    createBrowserRouter
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InventoryPage from './pages/InventoryPage';
import ProtectedRoute from './components/common/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignupPage />
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <InventoryPage />
            </ProtectedRoute>
        )
    }
]);

export default router;