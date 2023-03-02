import logo from './logo.svg';
import './App.css';

import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Home from './Home/Home';
import Departments from './Departments/Departments';
import Employees from './Employees/Employees';
import Job from './Jobs/Jobs';


function App() {
    return (
        <div>
            <div id="app">
                <aside>
                    <nav>
                        <ul className='nav flex-column'>
                            <li className='nav-item'>
                                <Link className='nav-link active' to="/">Home</Link>
                            </li>
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
                            <Route path="/" element={<Home />} />
                            <Route index path="employees" element={ <Employees/> } />
                            <Route path="jobs" element={ <Job/> } />
                            <Route path="departments" element={ <Departments/> } />
                    </Routes>
                    <Outlet />
                </main>
            </div>
            <footer id='footer' className='text-center align-items-center'>
                <div className='row d-flex justify-content-evenly'>
                    <div className='col'>
                        <div className='m-3'>
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                                <img className='img-thumbnail' src="https://img.icons8.com/ios-glyphs/256/facebook.png" alt="facebook" />
                                <h5>Facebook</h5>
                            </a>
                        </div>
                        <div className='m-3'>
                            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                                <img className='img-thumbnail' src="https://img.icons8.com/ios-glyphs/256/instagram-new.png" alt="instagram" />
                                <h5>Instagram</h5>
                            </a>
                        </div>
                        <div className='m-3'>
                            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                                <img className='img-thumbnail' src="https://img.icons8.com/ios-filled/256/linkedin-2.png" alt="linkedin" />
                                <h5>Linkedin</h5>
                            </a>
                        </div>
                    </div>
                    <div className='col' id='site-references'>
                        <p>Sitio desarrollado por Cristopher Zabrano</p>
                    </div>
                </div>
                <p>© 2023 - Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export default App;
