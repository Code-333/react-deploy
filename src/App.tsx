import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./components/List";
import AddToList from './components/AddToList';

export interface IState{
  people: {
    name: string,
    age: number,
    url: string,
    note?: string
  }[]
}

function App() {
  const [people, setPeople] = useState<IState["people"]>([
    {
      name: "Lebron James",
      age: 30,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/LeBron_James_Lakers.jpg/245px-LeBron_James_Lakers.jpg",
      note: "Allergic to staging in the same team"
    }
  ]);

  return (
    <div className='App'>
      <h1>People invited to my Party</h1>
      <List people={people}/>
      <AddToList people={people} setPeople={setPeople}/>
    </div>
  );
}

export default App;
