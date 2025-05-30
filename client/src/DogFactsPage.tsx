// DogFactsPage.tsx
// This component provides a CRUD interface for dog facts using a REST API backend.
// Users can add, search, edit, and delete dog facts. Data is stored in a SQLite database via Entity Framework Core on the server.

import { useEffect, useState } from "react";

// Type definition for a single dog fact
// id: unique identifier, text: the fact string
type DogFact = {
    id: number;
    text: string;
};

export default function DogFactsPage() {
    // State for all dog facts fetched from the server
    const [facts, setFacts] = useState<DogFact[]>([]);
    // State for the new fact input field
    const [newFact, setNewFact] = useState("");
    // State for the currently selected fact (for editing)
    const [selectedFact, setSelectedFact] = useState<DogFact | null>(null);
    // State for the edit input field
    const [editText, setEditText] = useState("");
    // State for the search input field
    const [search, setSearch] = useState("");

    // Fetch all dog facts from the backend API on component mount
    useEffect(() => {
        fetch("http://localhost:5215/dogfacts")
            .then((res) => res.json())
            .then((data) => setFacts(data));
    }, []);

    // Add a new dog fact to the backend and update state
    const handleAdd = async () => {
        if (newFact.trim().length === 0) return; // Prevent empty facts

        const res = await fetch("http://localhost:5215/dogfacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newFact }),
        });

        if (res.ok) {
            const added = await res.json();
            setFacts([...facts, added]); // Add new fact to state
            setNewFact(""); // Clear input
        }
    };

    // Delete a dog fact by id from the backend and update state
    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:5215/dogfacts/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setFacts(facts.filter((fact) => fact.id !== id)); // Remove from state
        }
    };

    // Filter facts based on search input (case-insensitive)
    const filteredFacts = facts.filter((fact) =>
        fact.text.toLowerCase().includes(search.toLowerCase())
    );

    // When a table row is clicked, select the fact for editing
    const handleRowClick = (fact: DogFact) => {
        setSelectedFact(fact);
        setEditText(fact.text);
    };

    // Render the UI
    return (
        <div className="p-4">
            {/* Page title */}
            <h1 className="text-2xl font-bold mb-4">Dog Facts - The very simple SQLite and Entity Framework Core Demo</h1>

            {/* Add new fact input and button */}
            <div className="flex items-center space-x-2 mb-2">
                <label htmlFor="addFact" className="font-medium w-25">Add new fact: </label>
                <input
                    type="text"
                    value={newFact}
                    onChange={(e) => setNewFact(e.target.value)}
                    maxLength={100}
                    className="border p-2 flex-1 rounded mr-4 max-w-200"
                />
                <button
                    onClick={handleAdd}
                    disabled={newFact.trim() === ""}
                    className={`px-3 py-1 text-white rounded ${newFact.trim() === "" ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Add
                </button>
            </div>
            {/* Search input */}
            <div className="flex items-center space-x-2 mb-4">
                <label htmlFor="searchFact" className="font-medium w-25">Search: </label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 flex-1 rounded mr-4 max-w-200"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                {/* Table of dog facts (click row to edit, delete button for each) */}
                <div className="sm:w-2/3">
                    <table className="w-full border shadow-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left p-2">ID</th>
                                <th className="text-left p-2">Fact</th>
                                <th className="text-left p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFacts.map((fact) => (
                                <tr
                                    key={fact.id}
                                    onClick={() => handleRowClick(fact)}
                                    className="hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="p-2 border-b">{fact.id}</td>
                                    <td className="p-2 border-b">{fact.text}</td>
                                    <td className="p-2 border-b">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click (edit) when deleting
                                                handleDelete(fact.id);
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit form for selected fact */}
                {selectedFact && (
                    <div className="sm:w-1/3 border p-4 rounded bg-gray-50 shadow-md">
                        <h3 className="text-lg font-bold mb-2">Edit fact #{selectedFact.id}</h3>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <button
                            onClick={async () => {
                                // Update the fact in the backend and update state
                                const response = await fetch(`http://localhost:5215/dogfacts/${selectedFact.id}`, {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ id: selectedFact.id, text: editText }),
                                });

                                if (response.ok) {
                                    const updated = await response.json();
                                    setFacts((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
                                    setSelectedFact(null); // Close edit form
                                }
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}