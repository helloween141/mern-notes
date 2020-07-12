import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import AuthContext from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { NoteCard } from '../components/NoteCard'
import { useMessage } from '../hooks/message.hook'
import { CSSTransition } from 'react-transition-group'
export const NotesPage = () => {
  const { token } = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const { request, loading } = useHttp()
  const message = useMessage()

  const getNotes = useCallback(async () => {
    try {
      const result = await request('/api/notes/', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setNotes(result)
    } catch(e) {}
  }, [request, token])

  const deleteNote = async (id) => {
    try {
      const result = await request('/api/notes/delete', 'POST', {id}, {
        Authorization: `Bearer ${token}`
      })
      if (result.success) {
        setNotes(notes.filter(note => note._id !== id))
        message('Note has been removed')
      }
    } catch(e) {}
  }

  useEffect(() => {
    getNotes()
  }, [getNotes])

  if (loading) {
    return <Loader />
  } else {

    const notesList = notes.map((note, index) => (
        <div className="col s6">
          <NoteCard key={index} {...note } deleteHandler={deleteNote} />
        </div>
    ))

    return (
      <CSSTransition
        classNames={'note-t-group'}
        timeout={500}
        in={notesList.length > 0}>
        <div className="row">
          <h3>Notes List</h3>
          {notesList.length > 0 ? notesList : <div>There is no notes yet...</div>}
        </div>
      </CSSTransition>      
    )
  }

}