import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import AuthContext from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { NoteCard } from '../components/NoteCard'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const noteId = useParams().id
  const [note, setNote] = useState(null)
  const { request, loading } = useHttp()

  const getNote = useCallback( async () => {
    try {
      const result = await request(`/api/notes/${noteId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setNote(result)
    } catch(e) {}
  }, [request, token, noteId])

  useEffect(() => {
    getNote()
  }, [getNote])

  if (loading) {
    return <Loader />
  } else {
    return (
      <NoteCard {...note } isDetail={true} />
    )
  }

}