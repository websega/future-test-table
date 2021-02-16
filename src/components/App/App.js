import CheckForm from '../CheckForm/CheckForm';
import UserTable from '../UserTable/UserTable';

/*
	+------+------------+-----------------+-----------------+---------------+
	| id   | firstName  | lastName        | email           | phone         |
	+------+------------+-----------------+-----------------+---------------+
	|input | input      | input           | input           | input         |
	+------+------------+-----------------+-----------------+---------------+
*/

/*
+------+------------+-----------------+-----------------+---------------+
| id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
+------+------------+-----------------+-----------------+---------------+
| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
*/

const App = () => {
  console.log('render APP');

  return (
    <div className='App'>
      <CheckForm />

      <button type='button' className='btn btn-primary'>
        Добавить
      </button>

      <div className='input-group mb-3'>
        <input type='text' className='form-control' placeholder='Найти' />
        <button
          className='btn btn-outline-secondary'
          type='button'
          id='button-addon2'
        >
          Button
        </button>
      </div>

      <table className='table table-hover table-bordered'>
        <thead>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className='form-control'
                type='text'
                placeholder='Задайте id'
              ></input>
            </td>
            <td>
              <input
                className='form-control'
                type='text'
                placeholder='Имя'
              ></input>
            </td>
            <td>
              <input
                className='form-control'
                type='text'
                placeholder='Фамилия'
              ></input>
            </td>
            <td>
              <input
                className='form-control'
                type='text'
                placeholder='Электронная почта'
              ></input>
            </td>
            <td>
              <input
                className='form-control'
                type='text'
                placeholder='Номер телефона'
              ></input>
            </td>
          </tr>
        </tbody>
      </table>

      <UserTable />
    </div>
  );
};

export default App;
