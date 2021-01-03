import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies, { getJSON } from 'js-cookie';
import '../css/Notes.css'

function Notes() {

    const email = Cookies.get("email");
    const pass = Cookies.get("pass");
    const stock = Cookies.get("currentStock");
    const [docs , setDocs] = useState(); 
    const [currentNotes, setCurrentNotes] = useState([]);

    function addNoteFunction() {
        axios.post(`/api/users/notes/add/${email}/${pass}/${"TSLA"}/${note}`).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        axios.post(`/api/users/notes/get/${email}/${pass}/TSLA`).then((res) => {
            res.data.stock.forEach(element => {
                if (element.Ticker === 'TSLA') {
                    setCurrentNotes(element.Notes)
                }
            });

            setDocs(res.data); 
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    const [note, setNote] = useState('');
    return (
        <div className="card bg-dark" >
            <div className="card-title">
                {'Cookies.get(currentStock)'}
            </div>
            <div className="card-body">
                <div className="from">
                    <input
                        type="text"
                        name="Note"
                        value={note.value}
                        placeholder={"Enter Ticker Here"}
                        className="form-control bg-dark text-white"
                        onChange={(evt) => { setNote(evt.target.value) }} />
                    <div className="Button">
                        <div className="btn btn-light" type="submit" onClick={addNoteFunction}>
                            Add Note
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <h3>
                    <ul className="list-group-flush">
                        {currentNotes.map((element) => {
                            return (
                                <div className="notesListItem">
                                    <div className="list-group-item">{element}</div>
                                    <button className="btn btn-dark">remove</button>
                                </div>
                            )
                        })}
                    </ul>
                </h3>
            </div>
        </div>


    )



} export default Notes; 