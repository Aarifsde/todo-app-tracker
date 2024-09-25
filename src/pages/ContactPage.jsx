import { useState } from 'react';
import peopleData from '../people.json';
import Loader from '../components/Loader';

const ContactPage = () => {
  const loading = false;
  const [contacts, setContacts] = useState(peopleData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    Name: '',
    Mobile: '',
    Email: '',
    pWd: '',
  });

  const handleAddContact = () => {
    const newId = `P-${contacts.length + 1}`;
    const newEntry = {
      ...newContact,
      Id: newId,
      CreatedAt: new Date().toISOString(),
    };
    setContacts([...contacts, newEntry]);
    setShowAddForm(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Contacts</h2>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Cancel" : "Add Contact"}
      </button>

      {showAddForm && (
        <div className="bg-gray-100 p-4 rounded shadow-lg mb-6">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-4 rounded"
            value={newContact.Name}
            onChange={(e) => setNewContact({ ...newContact, Name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mobile"
            className="border p-2 w-full mb-4 rounded"
            value={newContact.Mobile}
            onChange={(e) => setNewContact({ ...newContact, Mobile: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4 rounded"
            value={newContact.Email}
            onChange={(e) => setNewContact({ ...newContact, Email: e.target.value })}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleAddContact}
          >
            Submit
          </button>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div key={contact.Id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{contact.Name}</h3>
            <p className="mb-2">Mobile: {contact.Mobile}</p>
            <p className="mb-2">Email: {contact.Email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
