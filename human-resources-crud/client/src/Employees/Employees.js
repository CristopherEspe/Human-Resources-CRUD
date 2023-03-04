import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [formError, setFormError] = useState(null);
    const [formUpdateError, setFormUpdateError] = useState(null);
    const [show, setShow] = useState(false);
    const [updateItem, setUpdateItem] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (department) => {
        setShow(true);
        setUpdateItem(department);
    }

    const [departments, setDepartments] = useState([]);
    const [jobs, setJobs] = useState([]);

    const getEmployees = async () => {
        const response = await fetch('/employees');
        const data = await response.json();
        setEmployees(data);
    }

    const getDepartments = async () => {
        const response = await fetch('/departments');
        const data = await response.json();
        setDepartments(data);
    }

    const getJobs = async () => {
        const response = await fetch('/jobs');
        const data = await response.json();
        setJobs(data);
    }

    const deleteEmployee = async (id) => {
        const response = await fetch(`/employees/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Empleado eliminado');
            getEmployees();
        } else {
            const json = await response.json();
            setFormError(json.message);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const salary = e.target.salary.value;
        const hireDate = e.target.hireDate.value;
        const departmentId = e.target.department.value;
        const jobId = e.target.job.value;

        if (firstname.trim() === '') {
            setFormError('El nombre no puede estar vacio');
            return;
        }

        if (lastname.trim() === '') {
            setFormError('El apellido no puede estar vacio');
            return;
        }

        if (email.trim() === '') {
            setFormError('El email no puede estar vacio');
            return;
        }

        if (phone.trim() === '') {
            setFormError('El telefono no puede estar vacio');
            return;
        }

        if (salary.trim() === '') {
            setFormError('El salario no puede estar vacio');
            return;
        }

        if (hireDate.trim() === '') {
            setFormError('La fecha de contratacion no puede estar vacia');
            return;
        }

        if (!departmentId || departmentId === '') {
            setFormError('El departamento no puede estar vacio');
            return;
        }

        if (!jobId || jobId === '') {
            setFormError('El puesto no puede estar vacio');
            return;
        }

        setFormError(null);

        const response = await fetch('/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, email, phone, hireDate, departmentId, jobId, salary })
        });

        if (response.ok) {
            console.log('Empleado creado');
            getEmployees();
        }
    }

    const onSubmitUpdate = async (e) => {
        e.preventDefault();
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const salary = e.target.salary.value;
        const hireDate = e.target.hireDate.value;
        const departmentId = e.target.department.value;
        const jobId = e.target.job.value;

        if (firstname.trim() === '') {
            setFormUpdateError('El nombre no puede estar vacio');
            return;
        }

        if (lastname.trim() === '') {
            setFormUpdateError('El apellido no puede estar vacio');
            return;
        }

        if (email.trim() === '') {
            setFormUpdateError('El email no puede estar vacio');
            return;
        }

        if (phone.trim() === '') {
            setFormUpdateError('El telefono no puede estar vacio');
            return;
        }

        if (salary.trim() === '') {
            setFormUpdateError('El salario no puede estar vacio');
            return;
        }

        if (hireDate.trim() === '') {
            setFormUpdateError('La fecha de contratacion no puede estar vacia');
            return;
        }

        if (!departmentId || departmentId === '') {
            setFormUpdateError('El departamento no puede estar vacio');
            return;
        }

        if (!jobId || jobId === '') {
            setFormUpdateError('El puesto no puede estar vacio');
            return;
        }

        setFormUpdateError(null);

        const response = await fetch(`/employees/${updateItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, email, phone, hireDate, departmentId, jobId, salary })
        });

        if (response.ok) {
            console.log('Empleado actualizado');
            getEmployees();
            handleClose();
        } else {
            console.log('Error al actualizar');
            const json = await response.json();
            console.log(json);
            setFormUpdateError(json.message);
        }
    }

    const handleUpdate = (e) => {
        setUpdateItem({
            ...updateItem,
            [e.target.name]: e.target.value
        });
    }

    const parseDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();

        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }

    useEffect(() => {
        async function getData() {
            getDepartments();
            getJobs();
            getEmployees();
        }

        getData();
    }, []);

    return (
        <div className="container">
            <h1>Empleados</h1>
            <div className="form ui-box">
                <h2 className="ui-box-title">Crear empleado</h2>
                {formError && <div className="alert alert-danger mb-4">
                    { formError }
                </div>}
                <form method="POST" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstname">Nombre</label>
                        <input type="text" className="form-control" id="firstname" name="firstname" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" className="form-control" id="lastname" name="lastname" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone">Telefono</label>
                        <input type="text" className="form-control" id="phone" name="phone" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary">Salario</label>
                        <input type="number" min="0" className="form-control" id="salary" name="salary" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hireDate">Fecha de contratacion</label>
                        <input type="date" className="form-control" id="hireDate" name="hireDate" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department">Departamento</label>
                        <select className="form-select" id="department" name="department" required>
                            <option value="">Seleccionar</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="job">Puesto</label>
                        <select className="form-select" id="job" name="job" required>
                            <option value="">Seleccionar</option>
                            {jobs.map((job) => (
                                <option key={job.id} value={job.id}>{job.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </div>
                </form>
            </div>
            <div className="departments ui-box">
                <h2 className="ui-box-title">Ultimos empleados</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Fecha de contratacion</th>
                            <th>Puesto</th>
                            <th>Departamento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee}>
                                <td>{employee.id}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{parseDate(employee.hireDate)}</td>
                                <td>{employee.job.title}</td>
                                <td>{employee.department.name}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteEmployee(employee.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleShow(employee)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formUpdateError && <div className="alert alert-danger mb-4">
                        {formUpdateError}
                    </div>}
                    <form method="POST" onSubmit={onSubmitUpdate}>
                        <div className="mb-3">
                            <label htmlFor="firstname">Nombre</label>
                            <input type="text" value={updateItem.firstname} className="form-control" id="firstname" name="firstname" onChange={handleUpdate} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" value={updateItem.lastname} className="form-control" id="lastname" name="lastname" onChange={handleUpdate} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={updateItem.email} className="form-control" id="email" name="email" onChange={handleUpdate} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone">Telefono</label>
                            <input type="text" value={updateItem.phone} className="form-control" id="phone" name="phone" onChange={handleUpdate} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary">Salario</label>
                            <input type="number" value={updateItem.salary} min="0" className="form-control" id="salary" name="salary" onChange={handleUpdate} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hireDate">Fecha de contratacion</label>
                            <input type="date" value={parseDate(updateItem.hireDate)} className="form-control" id="hireDate" name="hireDate" onChange={handleUpdate} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="department">Departamento</label>
                            <select className="form-select" id="department" name="department" onChange={handleUpdate} required>
                                <option value="">Seleccionar</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id} selected={department.id === updateItem.departmentId}>{department.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job">Puesto</label>
                            <select className="form-select" id="job" name="job" onChange={handleUpdate} required>
                                <option value="">Seleccionar</option>
                                {jobs.map((job) => (
                                    <option key={job.id} value={job.id} selected={job.id === updateItem.jobId}>{job.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className='d-flex justify-content-end mt-4'>
                            <button type="button" className="btn btn-danger me-2" onClick={handleClose}>cancelar</button>
                            <button type="submit" className="btn btn-primary">Actualizar</button>
                        </div>
                        <input type="hidden" name="id" value={updateItem.id} />
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Employees;