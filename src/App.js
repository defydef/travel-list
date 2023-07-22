import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", qty: 2, packed: false },
  { id: 2, description: "Socks", qty: 12, packed: true },
  { id: 3, description: "Charger", qty: 12, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((i) => i.id !== id));
  }

  function handlePackedItem(id) {
    setItems((items) =>
      items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form items={items} onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackedItem={handlePackedItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const numOfOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (description === "") return;
    const newItem = { description, qty, packed: false, id: Date.now() };
    onAddItems(newItem);
    setQty(1);
    setDescription("");
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

function PackingList({ items, onDeleteItem, onPackedItem }) {
  return (
    <section className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDelete={onDeleteItem} onPacked={onPackedItem} />
        ))}
      </ul>
    </section>
  );
}

function Item({ item, onDelete, onPacked }) {
  return (
    <li key={item.id}>
      {item.packed ? (
        <input
          type="checkbox"
          onChange={() => onPacked(item.id)}
          value={item.packed}
          checked
        />
      ) : (
        <input
          type="checkbox"
          onChange={() => onPacked(item.id)}
          value={item.packed}
        />
      )}

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.qty} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
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
