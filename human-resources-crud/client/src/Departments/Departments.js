import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [formError, setFormError] = useState(null);
    const [formUpdateError, setFormUpdateError] = useState(null);
    const [show, setShow] = useState(false);
    const [updateItem, setUpdateItem] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (department) => {
        setShow(true);
        setUpdateItem(department);
    }

    const getDepartments = async () => {
        const response = await fetch('/departments');
        const data = await response.json();
        setDepartments(data);
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;

        if (name.trim() === '') {
            setFormError('El nombre del departamento no puede estar vacio');
            return;
        }

        const response = await fetch('/departments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            console.log('Departamento creado');
            getDepartments();
        }
    }

    const deleteDepartment = async (id) => {
        const response = await fetch(`/departments/${id}`, {
            method: 'DELETE'
        }).catch((response) => {
            console.log(response);
            setFormError(response.message);
        });

        if (response.ok) {
            console.log('Departamento eliminado');
            getDepartments();
        } else {
            const json = await response.json();
            setFormError(json.message);
        }
    }

    const onSubmitUpdate = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;

        if (name.trim() === '') {
            setFormUpdateError('El nombre del cargo no puede estar vacio');
            return;
        }

        setFormUpdateError(null);

        const response = await fetch(`/departments/${updateItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            console.log('Departamento actualizado');
            getDepartments();
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
        getDepartments();
    }, []);

    return (
        <div className="container">
            <h1>Departamentos</h1>
            <div className="form ui-box">
                <h2 className="ui-box-title">Crear departamento</h2>
                {formError && <div className="alert alert-danger mb-5">
                    { formError }
                </div>}
                <form method="POST" onSubmit={onSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <div className="d-flex">
                        <div className="flex-grow-1 me-3">
                            <input type="text" className="form-control" id="name" name="name" required />
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button type="submit" className="btn btn-primary">Crear</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="departments ui-box">
                <h2 className="ui-box-title">Ultimos departamentos</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td>{department.name}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteDepartment(department.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleShow(department)}>Editar</button>
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
                            <input type="text" className="form-control" id="name" name="name" value={updateItem.name} onChange={handleUpdate} required />
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

export default Departments;