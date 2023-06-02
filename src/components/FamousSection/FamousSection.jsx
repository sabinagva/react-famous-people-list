import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(()=>{
    fetchPeople();
  },[])

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios.get('/people')
    .then((response)=>{
      console.log('response data is', response.data)
      setPeopleArray(response.data)
    }).catch((error)=>{
      console.log('there is a error in get function', error)
    })
  }
//when do we do response or result
// TODO: create POST request to add this new person to the database

    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    axios.post('/people',{
      name: famousPersonName,
      role: famousPersonRole,
    }).then((response)=>{
      fetchPeople();
      setPersonName('')
      setPersonRole('')
    }).catch((error)=>{
      console.log('there is an error in post function', error)
    })
    
    
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {/* TODO: Render the list of famous people */}
          {famousPeopleArray.map(people=>{
            <li key={people.id}>
              {people.name} is famous for {people.role}
            </li>
          })}
        </ul>
      </section>
    );
}

export default FamousSection;
