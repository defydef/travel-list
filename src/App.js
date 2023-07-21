import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}

function Form() {
  const numOfOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (description === "") return;

    const newItem = { description, qty, packed: false, id: Date.now() };
    console.log(newItem);
    setQty((qty) => 1);
    setDescription((description) => "");
  }

  return (
    <form className="add-form">
      <h3>What do you need for your trip?</h3>
      <select onChange={(e) => setQty(Number(e.target.value))} value={qty}>
        {numOfOptions.map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

function PackingList() {
  const [items, setItems] = useState(initialItems);
  return (
    <section className="list">
      <ul>
        {items.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </ul>
    </section>
  );
}

function Item({ item }) {
  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items already on your list, and you already packed</em>
    </footer>
  );
}

export default App;
