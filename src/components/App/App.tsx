import React from 'react';

import Header from '../Header';
import AddRowForm from '../AddRowForm/AddRowForm';
import Filterbar from '../Filterbar/Filterbar';
import UserTable from '../UserTable/UserTable';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <Filterbar />
      <AddRowForm />
      <UserTable />
    </div>
  );
};

export default App;
