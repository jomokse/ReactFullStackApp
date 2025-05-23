import { useEffect, useState } from "react";

type DogFact = {
    id: number;
    text: string;
};

export default function DogFactsPage() {
    const [facts, setFacts] = useState<DogFact[]>([]);
    const [newFact, setNewFact] = useState("");
    const [selectedFact, setSelectedFact] = useState<DogFact | null>(null);
    const [editText, setEditText] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:5215/dogfacts")
            .then((res) => res.json())
            .then((data) => setFacts(data));
    }, []);

    const handleAdd = async () => {
        if (newFact.trim().length === 0) return;

        const res = await fetch("http://localhost:5215/dogfacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newFact }),
        });

        if (res.ok) {
            const added = await res.json();
            setFacts([...facts, added]);
            setNewFact("");
        }
    };

    const handleDelete = async (id: number) => {
        const res = await fetch("http://localhost:5215/dogfacts/${id}", {
            method: "DELETE",
        });

        if (res.ok) {
            setFacts(facts.filter((fact) => fact.id !== id));
        }
    };


    const filteredFacts = facts.filter((fact) =>
        fact.text.toLowerCase().includes(search.toLowerCase())
    );

    const handleRowClick = (fact: DogFact) => {
        setSelectedFact(fact);
        setEditText(fact.text);
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dog Facts - The very simple SQLite and Entity Framework Core Demo</h1>

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
                {/* TailWind table */}
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
                                                e.stopPropagation();
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

                {/* Edit form */}
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
                                const response = await fetch("http://localhost:5215/dogfacts/${selectedFact.id}", {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ id: selectedFact.id, text: editText }),
                                });

                                if (response.ok) {
                                    const updated = await response.json();
                                    setFacts((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
                                    setSelectedFact(null);
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