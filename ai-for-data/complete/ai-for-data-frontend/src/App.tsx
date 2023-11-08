import { useCollection, useQuery, useSquid } from '@squidcloud/react';
import './App.css';
import { useState } from 'react';
import NavBar from './components/nav-bar';
import { Button } from '@mui/material';
import DisplayPets from './components/display-pets';
import { FavoritePets } from './common/favorite-pets';
import AiDatabot from './components/ai-databot';

function App() {
  const favoritePetsCollection = useCollection<FavoritePets>('animals');
  const { executeFunction } = useSquid();
  const { data } = useQuery(favoritePetsCollection.query().dereference(), true);
  const [dataIsAdded, setDataIsAdded] = useState(false);

  const addData = () => {
    executeFunction('addMockData');
    setDataIsAdded(true);
  };

  return (
    <div>
      <NavBar />
      {data && <DisplayPets favoritePets={data} />}
      <Button onClick={() => addData()} disabled={dataIsAdded}>
        Add Mock Data
      </Button>
      <AiDatabot />
    </div>
  );
}

export default App;
