import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Pet from './Pet';
import './index.css';
//import { getSnapshotData } from 'jest-snapshot/build/utils';

const App = () => {
  const [pets, setPets] = useState([]);
  const [isNetPetOpen, setNewPetOpen] = useState(
    false
  );
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {

    /*async function getData() {
      const res = await fetch('http://localhost:3001/pets');
      const pets = await res.json();
      setPets(pets);
    }
    getData();*/

    setLoading(true);
    fetch('http://localhost:3001/pets')
    .then(res => res.json())
    .then(pets => setPets(pets))
    .finally(() => setLoading(false));

  }, []);
  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      {isLoading ? (
        <div className="loading"> Loading...</div>
      ) : (
        <>
        <ul>
          {pets.map(pet => (
            <li key={pet.id}>
              <Pet pet={pet} />
            </li>
          ))}
        </ul>
        <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
        </>
      )}
      <Modal 
        isOpen = {isNetPetOpen}
        onRequestClose={() => setNewPetOpen(false)}
        >Hello</Modal>
    </main>
  );
};

const el = document.querySelector('#root');
Modal.setAppElement(el);

ReactDOM.render(
  <App />,
  el
);