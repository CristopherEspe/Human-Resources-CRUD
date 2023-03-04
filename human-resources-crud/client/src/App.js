import logo from './logo.svg';
import './App.css';

import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Departments from './Departments/Departments';
import Employees from './Employees/Employees';
import Job from './Jobs/Jobs';


function App() {
    return (
        <div id="app">
            <aside>
                <nav>
                    <ul className='nav flex-column'>
                        <li className='nav-item'>
                            <Link className='nav-link active' to="employees">Empleados</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="jobs">Cargos</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="departments">Departamentos</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main>
                <Routes>
                        <Route path="/" element={<Employees />} />
                        <Route index path="employees" element={ <Employees/> } />
                        <Route path="jobs" element={ <Job/> } />
                        <Route path="departments" element={ <Departments/> } />
                </Routes>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
