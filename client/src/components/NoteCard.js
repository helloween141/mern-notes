import React from 'react'

export const NoteCard = ({ _id, title, text, date, deleteHandler, isDetail }) => {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{title}</span>
            <p>{text}</p>
          </div>
          <div className="card-action left-align">
            <span className="orange-text">Date: {date}</span>
            {!isDetail && 
              <button className="btn delete-btn" onClick={() => deleteHandler(_id)}>
                <i className="material-icons center">delete_forever</i>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
