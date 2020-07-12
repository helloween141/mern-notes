import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { NotesPage } from './pages/NotesPage'
export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
    <Switch>
      <Route path="/" exact>
        <NotesPage></NotesPage>
      </Route>
      <Route path="/create" exact>
        <CreatePage></CreatePage>
      </Route>
      <Route path="/note/:id">
        <DetailPage></DetailPage>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage></AuthPage>
      </Route>     
    </Switch>
  )
}
