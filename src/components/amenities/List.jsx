import React, { useState } from 'react'

const List = () => {

  const[username, setUserName] = useState();
  const[password, setPassword] = useState();
  const[error, setError] = useState();


   const handleSubmit=(e) => {
      e.preventDefault();

      if(username || password){
         setError("Username and Password was successful")
      }
     
      else{
        setError("Username and Password is empty! please fill the filed")
      }
   }
    const data = [
        { id: 1, name: "stalin" },
        { id: 2, name: "stalin1" },
        { id: 3, name: "stalin4" },
      ];

  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      
      {/* <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '50%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.id}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <table style={{padding:'8px', borderCollapse: 'collapse'}}>
        <thead>
         <tr>

            <th style={{border:'1px solid black', padding: '8px' }}>ID</th>
            <th style={{border:'1px solid black', padding: '8px' }}>NAME</th>
         </tr>
        
        </thead>

        <tbody>

           {data.map((item)=> (
            <tr key={item.id}>
            <td style={{border:'1px solid black', padding: '8px'}}>{item.id}</td>
            <td style={{border:'1px solid black', padding: '8px'}}>{item.name}</td>
            </tr>
           ))} 
       
        </tbody>
      </table>

      {/* table --> thead-tr,th, tbody--tr,td */}

      <div>

        <h1>validation</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <label>username: </label>
            <input type='text' value={username} onChange={(e) => setUserName(e.target.value)}/>
            <br />
            <label style={{marginTop:'30px'}}>password: </label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p style={{color: "red"}}>{error}</p>}
            <br />
            <button style={{marginTop:'30px'}}>submit</button>
          </form>
        </div>

        {data.map((p,index) => (
          <div>
            {/* <p>{p.id}</p> */}
            <p>{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List;
