import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [univ, setUniv] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [statePro, setStatePro] = useState(false);

  const getUnivFromApi = async () => {
    const university = await axios.get('http://universities.hipolabs.com/search')
    setUniv(university.data);
    extractStates(university.data);
  };

  useEffect(() => {
    if (search) {
      doSearch(search);
    } else {
      getUnivFromApi();
    }
  }, [search]);

  const doSearch = async (search) => {
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?country=${search}`);
      console.log(response);
      setUniv(response.data);
      extractStates(response.data); // Extract states from the search results
    } catch (err) {
      console.log("Error while fetching: " + err);
    }
  };

  const extractStates = (data) => {
    const uniqueStates = [...new Set(data.map(university => university['state-province']).filter(Boolean))];
    setStates(uniqueStates);
  };

  const handleDownload = (university) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(university, null, 2)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${university.name}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button type="submit">Search</button> */}
      </form>
      {states.length > 0 && (
        <select onChange={(e) => setSelectedState(e.target.value)} name="states" id="states">
          <option value="">Select State/Province</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      )}
      <div className="container">
        {univ
          .filter(university => selectedState ? university['state-province'] === selectedState : true)
          .map((university, index) => (
            <div className="card" key={index}>
              <h3>{university.name}</h3>
              <p>Country: {university.country}</p>
              <p>State/Province: {university['state-province']}</p>
              <button className="button" onClick={() => handleDownload(university)}>Download</button>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
