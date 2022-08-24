import React from 'react'
import Axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'

export default function Index({ employees }) {

     //====Start Function Delete Data=====
     const router = useRouter()

     const deleteUser = (ID) => {
        Axios
        .delete('http://localhost:8080/employees/' + ID)
        .then(function (response) {
          console.log(response);
          router.push('/employee');
        })
        .catch(function (error) {
          console.log(error);
          router.push('/employee');
        });
      }
      //====End Function Delete Data=====

  return (
    <>
       <br />
       <div className="container">
      <div className="card">
  <div className="card-header">
    ข้อมูลพนักงาน
  </div>
  <div className="card-body">
<table id="example2" className="table table-bordered table-hover table-responsive" border="1">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th>Employee Name</th>
                    <th>Emplyee Username</th>
                    <th>Employee Password</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                {employees.map((data) => (
                  <tr key={data.ID}>
                    <td className="text-center">{data.ID}</td>
                    <td>{data.Employee_name}</td>
                    <td>{data.Employee_username}</td>
                    <td>{data.Employee_password}</td>
                    <td className="text-center"><Link href={`/employee/edit/${data.ID}`}><a className="btn btn-warning btn-sm">แก้ไข</a></Link></td>
                    <td className="text-center"><button type="button" className="btn btn-danger btn-sm" onClick={() => { deleteUser(data.ID)}}>ลบ</button></td>
                  </tr>
                ))}
                </tbody>
              </table>
              <Link href="/employee/post"><a className="btn btn-success btn-sm text-right">เพิ่มข้อมูลพนักงาน</a></Link>
    </div>
    </div>
    </div>
    </>
  )
}

export const getServerSideProps = async () => {
    const res = await Axios.get("http://localhost:8080/employees");
    const data= res.data;
    return {
      props: { employees: data }
    }
}