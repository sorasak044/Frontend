import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Navbar from '../../../components/Navbar';

export default function UpdateEmployee({ employee }) {

    const router = useRouter();

    const [Employee_id, setEmployee_id] = useState(employee.Employee_id);
    const [Employee_name, setEmployee_name] = useState(employee.Employee_name);
    const [Employee_username, setEmployee_username] = useState(employee.Employee_username);
    const [Employee_password, setEmployee_password] = useState(employee.Employee_password);

    const UpdateEmployees = (ID) => {
        Axios.put('http://localhost:8080/employees/' + ID, {

          employee_name: Employee_name,
          employee_username: Employee_username,
          employee_password: Employee_password
      })
      .then(function (response) {
        console.log(response);
        router.push('/employee');
      })
      .catch(function (error) {
        console.log(error);
        router.push('/employee');

      });

      }

  return (
    <>
      <br /><br />
      <div className="container">
      <div className="card">
  <div className="card-header">
    ฟอร์มแก้ไขข้อมูล
  </div>
  <div className="card-body">
        <form action="/" method="post">
        <input type="text" className="form-control" placeholder="รห้ส" onChange={(e) => { setId(e.target.value) }} defaultValue={employee.ID}/>
        <br />

        <input type="text" className="form-control" placeholder="ชื่อ-นามสกุล" onChange={(e) => { setEmployee_name(e.target.value) }} defaultValue={employee.Employee_name}/>
        <br />
        <input type="text" className="form-control" placeholder="ชื่อผู้ใช้" onChange={(e) => { setEmployee_username(e.target.value) }} defaultValue={employee.Employee_username}/>
        <br />
        <input type="text" className="form-control" placeholder="รหัสผ่าน" onChange={(e) => { setEmployee_password(e.target.value) }} defaultValue={employee.Employee_password}/>
        <br />
        <button type="button" className="btn btn-success" onClick={() => { UpdateEmployees(employee.ID)}}>บันทึก</button>
        </form>
        </div>
</div>
    </div>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
    const { data } = await Axios.get(`http://localhost:8080/employees/${params.id}`);
 
    if (!data) {
      return {
        notFound: true,
      };
    }
 
    const employee = data;
    return {
      props: {
        employee,
      },
    };
  };