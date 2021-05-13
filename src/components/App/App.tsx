import React from 'react';

import AddRowForm from '../AddRowForm/AddRowForm';
import CheckForm from '../CheckForm/CheckForm';
import Navbar from '../Navbar/Navbar';
import UserTable from '../UserTable/UserTable';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Navbar />
      <CheckForm />
      <AddRowForm />
      <UserTable />
    </div>
  );
};

export default App;
