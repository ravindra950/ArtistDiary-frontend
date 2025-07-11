import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
function Home() {
  const [artists, setArtists] = useState([]);
  const [form, setForm] = useState({ name: '', genre: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchArtists = async () => {
    const res = await axios.get(`${API_URL}/artists`);
    setArtists(res.data);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/artists/${editingId}`, form);
    } else {
      await axios.post(`${API_URL}/artists`, form);
    }
    setForm({ name: '', genre: '', description: '' });
    setEditingId(null);
    fetchArtists();
  };

  const handleEdit = (artist) => {
    setForm({ name: artist.name, genre: artist.genre, description: artist.description });
    setEditingId(artist._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/artists/${id}`);
    fetchArtists();
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Artist Diary</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" name="name" value={form.name} onChange={handleChange} placeholder="Artist Name" required />
        <input className="w-full p-2 border" name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required />
        <textarea className="w-full p-2 border" name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
       <div className="flex justify-center">
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded"
    type="submit"
  >
    {editingId ? 'Update Artist' : 'Add Artist'}
  </button>
</div>

      </form>

      <ul className="mt-6 space-y-4">
        {artists.map((artist) => (
          <li key={artist._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-center"><strong>Artist Name:</strong>{artist.name}</h2>
            <p className="text-xl font-semibold text-center" ><strong>Genre:</strong> {artist.genre}</p>
            <p className="text-xl font-semibold text-center"><strong>Description:</strong>{artist.description}</p>
            <div className="mt-2 space-x-2 text-center">
              <button className="bg-yellow-400 px-3 py-1  text-center" onClick={() => handleEdit(artist)}>Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(artist._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
