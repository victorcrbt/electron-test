import React from 'react';
import { ipcRenderer } from 'electron';

const App = () => {
  React.useEffect(() => {
    ipcRenderer.on('returnEvent', (event, data) => console.log(data));
  });

  return <button onClick={() => ipcRenderer.send('testEvent')}>emit</button>;
};

export default App;
