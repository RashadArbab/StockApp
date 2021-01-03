import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies, { getJSON } from 'js-cookie';
import '../css/Notes.css'

function Notes() {

    const email = Cookies.get("email");
    const pass = Cookies.get("pass");
    const stock = Cookies.get("currentStock");
    const [docs, setDocs] = useState();
    const [currentNotes, setCurrentNotes] = useState([]);

    function addNoteFunction() {
        axios.post(`/api/users/notes/add/${email}/${pass}/${stock}/${note}`).then((res) => {
            console.log(res.data)
        }).then(getNotes).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getNotes();
    }, [])

    function getNotes() {
        axios.post(`/api/users/notes/get/${email}/${pass}/${stock}`).then((res) => {
            res.data.stock.forEach(element => {
                if (element.Ticker === stock) {
                    setCurrentNotes(element.Notes)
                }
            });

            setDocs(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }

    function removeFunction(element) {

        var removeNote = element
        console.log(removeNote)
        axios.post(`/api/users/notes/remove/${email}/${pass}/${stock}/${removeNote}`).then((res) => {
            console.log(res.data);
        }).then(getNotes).catch((err) => {
            console.log(err)
        })
    }


    const [note, setNote] = useState('');
    return (
        <div className="container" >
            <div className="card col-sm-12 justify-content-center" >
                <div className="card-title">
                    {stock}
                </div>
                <div className="card-body">
                    <div className="from">
                        <div className="row justify-content-center">
                            <div className="input-text col-sm-10">
                                <input
                                    type="text"
                                    name="Note"
                                    value={note.value}
                                    placeholder={"Enter Note Here"}
                                    className="form-control input-group-text bg-dark text-white"
                                    onChange={(evt) => { setNote(evt.target.value) }} />
                            </div>
                            <div className="btn btn-light col-sm-2" type="submit" onClick={addNoteFunction}>
                                Add
                        </div>



                        </div>
                    </div>
                </div>

                <div>
                    <h3>
                        <div className="notes-list">
                            <div className="list-group  list-group-flush">
                                {currentNotes.map((element) => {
                                    return (
                                        <div className="row  justify-content-center">

                                            <li className="list-group-item col-sm-10">{element}</li>
                                            <button className="btn btn-dark col-sm-2" onClick={() => { removeFunction(element) }}>Remove</button>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </h3>
                </div>

            </div>
        </div>


    )



} export default Notes; 