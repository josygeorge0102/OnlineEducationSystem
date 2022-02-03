import React from 'react'
import {Table,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import initialDetails from './initialDetails';
import Search from './Search';

function students(){
    return(
      <div className="tc bg-green ma0 pa4 min-vh-100">
      <Search details={initialDetails}/>
    </div>
        /*<Container component="main" maxWidth="xs" alignItems='center' backgroundColor='white'>
        <Table striped bordered hover variant="light">
<thead>
<tr>
  <th>#</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Roll No</th>
</tr>
</thead>
<tbody>
<tr>
  <td>1</td>
  <td>Mark</td>
  <td>Otto</td>
  <td>1</td>
</tr>
<tr>
  <td>2</td>
  <td>Jacob</td>
  <td>Thornton</td>
  <td>2</td>
</tr>
<tr>
  <td>3</td>
  <td colSpan={2}>Larry the Bird</td>
  <td>3</td>
</tr>
</tbody>
</Table>
</Container>*/
    )
}
export default students;