import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';


function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [formError, setFormError] = useState(null);
    const [formUpdateError, setFormUpdateError] = useState(null);
    const [show, setShow] = useState(false);
    const [updateItem, setUpdateItem] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (job) => {
        setShow(true);
        setUpdateItem(job);
    }

    const getJobs = async () => {
        const response = await fetch('/jobs');
        const data = await response.json();
        setJobs(data);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const minSalary = e.target.minSalary.value;
        const maxSalary = e.target.maxSalary.value;

        if (minSalary < maxSalary) {
            setFormError('El salario minimo no puede ser mayor al salario maximo');
            return;
        }

        if (title.trim() === '') {
            setFormError('El nombre del cargo no puede estar vacio');
            return;
        }

        setFormError(null);

        const response = await fetch('/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, minSalary, maxSalary })
        });

        if (response.ok) {
            console.log('Cargo creado');
            getJobs();
        }
    }

    const deleteJob = async (id) => {
        const response = await fetch(`/jobs/${id}`, {
            method: 'DELETE'
        }).catch((response) => {
            console.log(response);
            setFormError(response.message);
        });

        if (response.ok) {
            console.log('Cargo eliminado');
            getJobs();
        } else {
            const json = await response.json();
            setFormError(json.message);
        }
    }

    const onSubmitUpdate = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const minSalary = e.target.minSalary.value;
        const maxSalary = e.target.maxSalary.value;

        if (minSalary < maxSalary) {
            setFormUpdateError('El salario minimo no puede ser mayor al salario maximo');
            return;
        }

        if (title.trim() === '') {
            setFormUpdateError('El nombre del cargo no puede estar vacio');
            return;
        }

        setFormUpdateError(null);

        const response = await fetch(`/jobs/${updateItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, minSalary, maxSalary })
        });

        if (response.ok) {
            console.log('Cargo actualizado');
            getJobs();
        } else {
            const json = await response.json();
            setFormUpdateError(json.message);
        }

        setShow(false);
    };

    const handleUpdate = (e) => {
        setUpdateItem({
            ...updateItem,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <div className="container">
            <h1>Cargos</h1>
            <div className="form ui-box">
                <h2 className="ui-box-title">Crear cargo</h2>
                {formError && <div className="alert alert-danger mb-4">
                    {formError}
                </div>}
                <form method="POST" onSubmit={onSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" id="title" name="title" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="minSalary">Salario minimo</label>
                        <input min="0" type="number" className="form-control" id="minSalary" name="minSalary" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="maxSalary">Salario maximo</label>
                        <input min="0" type="number" className="form-control" id="maxSalary" name="maxSalary" required />
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </div>
                </form>
            </div>
            <div className="departments ui-box">
                <h2 className="ui-box-title">Ultimos cargos</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Salario minimo</th>
                            <th>Salario maximo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job}>
                                <td>{job.id}</td>
                                <td>{job.title}</td>
                                <td>{job.minSalary.toFixed(2)}</td>
                                <td>{job.maxSalary.toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteJob(job.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleShow(job)}>Editar</button>
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
                        <div className="mb-5">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" className="form-control" id="title" name="title" value={updateItem.title} onChange={handleUpdate} required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="minSalary">Salario minimo</label>
                            <input min="0" type="number" className="form-control" id="minSalary" name="minSalary" value={updateItem.minSalary} onChange={handleUpdate} required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="maxSalary">Salario maximo</label>
                            <input min="0" type="number" className="form-control" id="maxSalary" name="maxSalary" value={updateItem.maxSalary} onChange={handleUpdate} required />
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

export default Jobs;