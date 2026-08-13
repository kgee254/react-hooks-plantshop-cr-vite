import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. FETCH PLANTS ON LOAD - for AllPlants.test
  useEffect(() => {
    fetch("http://localhost:3000/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // 2. ADD NEW PLANT - for CreatePlant.test
  function handleAddPlant(newPlant) {
    fetch("http://localhost:3000/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((addedPlant) => setPlants([...plants, addedPlant]));
  }

  // 3. TOGGLE SOLD OUT - for InStock.test - non-persisting
  function handleSoldOut(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, isSoldOut: !plant.isSoldOut } : plant
      )
    );
  }

  // 4. FILTER PLANTS - for SearchPlants.test
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={displayedPlants}
        onAddPlant={handleAddPlant}
        onSoldOut={handleSoldOut}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}

export default App;