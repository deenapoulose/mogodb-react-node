
import React ,{ useState ,useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import Axios from 'axios';
import './App.css';


function App() {
  const[fname,setFname]= useState('');
  const[age,setAge] = useState(0);
  const[flist,setFlist] = useState([]);
  const[efname,setEfname]=useState('');
  const [ed,setEditid]=useState()
  const[ea,setEa]=useState('0');
  const [show, setShow] = useState(false);
  const add = () =>{
    console.log(fname,age);
    Axios.post('http://localhost:3001/insert',{fname:fname,age:age});
    window.location.reload();
    

  }
  useEffect(()=>{
    Axios.get('http://localhost:3001/read').then((response)=>{
      console.log(response);
      setFlist(response.data);
    
    })
  },[])
  const deletename = (id)=>{
    console.log('idfh',id);
    Axios.delete(`http://localhost:3001/del/${id}`)
    window.location.reload();

  }
  const handleShow = (id1,ename,eage) => {
  console.log('id',eage)
    var newid=id1;
    setEfname(ename)
     setEditid(newid);
     setEa(eage)

 
    setShow(true);
    console.log(efname);
    
    

  }
  const handleToggle=() =>{
  
    setShow(false);
  }
  const updateitem = (id) =>{
    console.log('id',id)
    console.log('efname',efname)
    console.log('age',ea)

 
    Axios.put(`http://localhost:3001/update/${id}`,{
      efname:efname,ea:ea})
   
    alert("updated succesfully");
    setShow(false);
  
    window.location.reload();
    window.location.reload();
    }
  return (
    <div className="App">
     <h1>Mongodb crud</h1>
     <div className="row m-2">
     <label>Name:</label>
     <input type="text"   className='col form-control' onChange={(event)=>{
       setFname(event.target.value)
     }}/>
     <label>Age:</label>
     <input type="number"  className='col form-control' onChange={(event)=>{
       setAge(event.target.value)
     }} />
     <button  className='btn btn-primary mx-2' onClick={add}>ADD</button>
     </div>
     <h1>EMPOLYEE DETAILS</h1> 
     <div className="row m-4">
     <table className="table table-dark table-striped">
            <thead>
                <tr>
                  
                    <th>NAME</th>
                    <th>AGE</th>
                    <th>ACTION</th>
                </tr>
            </thead>
           <tbody>
            { flist.map((value,key)=>{
              return(
                        <tr key={key}>
                          
                            <td>{value.foodName}</td>
                            <td>{value.daysSinceIAte}</td>
                          <td><button onClick={() => handleShow(value._id,value.foodName,value.daysSinceIAte)} class="btn btn-sm btn-success">EDIT</button > 
                           < button onClick = {()=> deletename(value._id)} className="btn btn-sm btn-danger">DELETE</ button></td>
                          
                        </tr>
                       
            )})} 
            </tbody> 

        </table>
        </div>
     
        <Modal show={show}>
        <Modal.Header>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
        
          <input type="hidden"   value={ed}/>
            <Form.Control type="text" defaultValue={efname}  onChange={(e)=>{setEfname (e.target.value)  }} name="upname"  ></Form.Control>
            <Form.Control type="text" defaultValue={ea} onChange={(e)=>{setEa(e.target.value)  }}  name="upage"  ></Form.Control>
       
          <>
          
         
          </>
        
        </Modal.Body>
    
        <Modal.Footer>
        <Button  onClick={() => updateitem(ed)} variant="success"  >UPDATE</Button>
          <Button onClick={handleToggle} variant="secondary">Close Modal</Button>
        </Modal.Footer>
        </Form>
      </Modal>

     {/* { flist.map((value,ksey)=>{
       return <div><h4>{value.foodName}</h4><h4>{value.daysSinceIAte}</h4></div>

     })} */}
    </div>
  );
}

export default App;
