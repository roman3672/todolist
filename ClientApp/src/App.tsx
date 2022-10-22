import React from 'react';
import Layout from './components/Layout';
import './styles/custom.scss';
import TodoList from "./components/TodoList";

const App = () => {
  return(
      <Layout>
        <TodoList />
      </Layout>
  )
}

export default App
