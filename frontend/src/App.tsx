
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import PermissionsPage from './pages/PermissionsPage';
import RolesPage from './pages/RolesPage';

  function App() {

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/permissions" element={<PermissionsPage />} />
          <Route path="/roles" element={<RolesPage />} />
        </Routes>
      </Router>
    );
  }
export default App
