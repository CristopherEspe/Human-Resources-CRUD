import { Routes, Route, Link, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Home() {
    return (
        <div className="container">
            <h2>Inicio</h2>

            <div className="row">
                <div className="row">
                    <div className="col m-9">
                        Esta es una empresa de RRHH que se dedica a la gestión de recursos humanos de las empresas.

                        <p>Esta página le permitira añadir, editar y eliminar Departamentos, Cargos y Empleados</p>
                    </div>
                    <div className="col">
                        <img className='w-100 m-4 rounded-2' src="https://eddy.com/wp-content/uploads/2021/02/why-is-human-resources-important@2x-100-1024x543.jpg" alt="imagen" />
                    </div>
                </div>
                <div className="row">
                    <div className="col m-9">
                        <img className="w-100 rounded-2" src="https://img.freepik.com/free-vector/human-resources-hr-typographic-header-idea-recruitment-job-management-hr-manager-interviewing-job-candidate-flat-vector-illustration_613284-1240.jpg?w=1480&t=st=1677674766~exp=1677675366~hmac=7412c7b1b9f8fb049c5537641bb1709b9477b118ab151f5184b5928a475d9bd1" alt="imagen" />
                    </div>
                    <div className="col">
                        <h2>¿Qué es la gestión de recursos humanos?</h2>
                        <p>La gestión de recursos humanos es una de las áreas más importantes de una empresa. Es la encargada de gestionar los recursos humanos de la empresa, es decir, de los empleados, de los trabajadores, de los colaboradores, de los profesionales que trabajan en la empresa.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;