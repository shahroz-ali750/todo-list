import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Todo() {
    const [todoList, setTodoList] = useState([])
    const [editId, setEditId] = useState('')
    const [editTask, setEditTask] = useState('')
    const [editStatus, setEditStatus] = useState('')
    const [newTask, setNewTask] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [newDeadline, setNewDeadline] = useState('')
    const [editDeadline, seteditDeadline] = useState('')

    useEffect(()=>{
        
    },[])
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-md-7">
            <h2 className='text-center'>Todo List</h2>
                <div className="table-responsive">
                    <table className='table table-bordered'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" className='form-control my-2' value={"editedTask"} /></td>
                                <td><input type="text" className='form-control my-2' value={"editedStatus"} /></td>
                                <td><input type="datetime-local" className='form-control my-2' value={"editedDeadline"} /></td>
                                <td>
                                    <button className='btn btn-success btn-sm'><i class="fa-solid fa-check"></i></button>
                                    <button className='btn btn-primary btn-sm'><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button className='btn btn-danger btn-sm ml-1'><i className='fa-solid fa-trash'></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="text" className='form-control my-2' value={"editedTask"} /></td>
                                <td><input type="text" className='form-control my-2' value={"editedStatus"} /></td>
                                <td><input type="datetime-local" className='form-control my-2' value={"editedDeadline"} /></td>
                                <td>
                                    <button className='btn btn-success btn-sm'><i class="fa-solid fa-check"></i></button>
                                    <button className='btn btn-primary btn-sm'><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button className='btn btn-danger btn-sm ml-1'><i className='fa-solid fa-trash'></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="text" className='form-control my-2' value={"editedTask"} /></td>
                                <td><input type="text" className='form-control my-2' value={"editedStatus"} /></td>
                                <td><input type="datetime-local" className='form-control my-2' value={"editedDeadline"} /></td>
                                <td>
                                    <button className='btn btn-success btn-sm'><i class="fa-solid fa-check"></i></button>
                                    <button className='btn btn-primary btn-sm'><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button className='btn btn-danger btn-sm ml-1'><i className='fa-solid fa-trash'></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="text" className='form-control my-2' value={"editedTask"} /></td>
                                <td><input type="text" className='form-control my-2' value={"editedStatus"} /></td>
                                <td><input type="datetime-local" className='form-control my-2' value={"editedDeadline"} /></td>
                                <td>
                                    <button className='btn btn-success btn-sm'><i class="fa-solid fa-check"></i></button>
                                    <button className='btn btn-primary btn-sm'><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button className='btn btn-danger btn-sm ml-1'><i className='fa-solid fa-trash'></i></button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan='4'>Loading Products ...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-md-5">
                <h2 className='text-center'>Add Task</h2>
                <form className='bg-light p-4'>
                    <div className='mb-3'>
                        <label htmlFor="">Task</label>
                        <input type="text" className='form-control my-2' placeholder='Enter Task' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="">Status</label>
                        <input type="text" className='form-control my-2' placeholder='Enter Status' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="">Deadline</label>
                        <input type="text" className='form-control my-2' placeholder='Enter Deadline' />
                    </div>
                    <button className='btn btn-success btn-sm'>Add Task</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}
