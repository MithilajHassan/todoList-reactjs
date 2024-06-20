import React, { useEffect, useRef, useState } from "react";
import './TodoApp.css'

export default function TodoApp() {
    const [input, setInput] = useState('')
    const [items, setItems] = useState([])
    const [editId, setEditId] = useState(null)

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    })

    const storeItems = (event) => {
        event.preventDefault()
        if (input !== '') {
            if (editId !== null) {
                setItems(items.map((value, index) => {
                    if (editId === index) {
                        return input
                    }
                    return value
                }))
                setEditId(null)
                setInput('')
            } else {
                setItems([...items, input])
                setInput('')
            }
        }
    }
    const deleteItem = (index) => {
        setItems(items.filter((value, i) => i !== index))
    }
    const editItem = (index) => {
        setInput(items[index])
        setEditId(index)
    }

    return (
        <div className="todo-container">
            <form className="input-section" onSubmit={storeItems}>
                <h1>Todo App</h1>
                <div className="sub-input-section">
                    <input type="text" value={input} ref={inputRef} placeholder="Enter a task..." onChange={(event) => setInput(event.target.value)} />
                    <button type="submit" ><i class="fa-solid fa-plus"></i></button>
                </div>
            </form>
            <ul>
                {items.map((value, index) =>
                    <li key={index}><span>{value}</span>
                        <div className="actions-section">
                            <i className="fa-solid fa-file-pen" id="edit-btn" title="Edit" onClick={() => editItem(index)}></i>
                            <i className="fa-solid fa-trash-can" id="delete-btn" title="Delete" onClick={() => deleteItem(index)}></i>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}