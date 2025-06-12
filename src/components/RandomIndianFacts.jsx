// 5. Random Indian Fact Generator
// ● Objective:
// Build a Random Indian Fact Generator that displays interesting cultural facts.
// Functionality Requirements:
// ● Fetch Data:
// ○ From local data.
// ● Sample :
// [
// ● { "fact": "India has the world's largest postal network.", "category":
// "General" },
// ● { "fact": "Chess was invented in India.", "category": "History" }
// ○ ]
// ● Display:
// ○ Random fact
// ○ Button to get new fact
// ○ Optional category dropdown
// Technical Requirements:
// ● useState
// ● useEffect
// ● Dropdown filter

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const RandomIndianFacts = () => {
    const [facts, setFacts] = useState([]);
    const [category, setCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [random, setRandom] = useState("");

    let filteredFacts;

    const getRandom = () => {
        const total = filteredFacts.length;
        setRandom(filteredFacts[Math.floor(Math.random() * total)].fact);
    };

    useEffect(() => {
        const fetchFacts = async () => {
            try {
                const response = await axios.get("/random.json");
                console.log(response);
                setFacts(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load facts. Please check the data source or contact the developer.");
            }
        };
        fetchFacts();
    }, []);

    useEffect(() => {
        if (facts.length > 0) {
            getRandom();
        }
    }, [facts]);

    filteredFacts = facts.filter((fact) => {
        if (category === "all") {
            return true;
        } else {
            return fact.category === category;
        }
    });

    if (loading) {
        return (
            <div>
                Loading facts... If this takes too long, please ensure the data file exists or contact the developer.
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>{error}</h1>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    if (filteredFacts.length === 0) {
        return (
            <div>
                No facts available for the selected category. Please try again later or contact the developer.
            </div>
        );
    }

    return (
        <div>
            <h1>Random Indian Fact</h1>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="all">All</option>
                <option value="History">History</option>
                <option value="Demographics">Demographics</option>
                <option value="Culture">Culture</option>
                <option value="General">General</option>
                <option value="Unique">Unique</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Religion">Religion</option>
            </select>
            <button onClick={getRandom}>Get Random Fact</button>
            <p>{random}</p>
        </div>
    );
};

export default RandomIndianFacts;
