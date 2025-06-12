// 2. IPL Teams Viewer
// ● Objective:
// Build an IPL Teams Viewer that displays details about IPL teams, including logo,
// name, stadium, and championships.
// Functionality Requirements:
// ● Fetch Data:
// ○ From a local data. file in /public
// ● Sample data.:
// [
// ● { "name": "Mumbai Indians", "homeGround": "Wankhede Stadium",
// "championships": 5, "logo":
// "https://upload.wikimedia.org/wikipedia/en/2/25/Mumbai_Indians_Logo.svg
// " },
// ● { "name": "Chennai Super Kings", "homeGround": "M. A. Chidambaram
// Stadium", "championships": 5, "logo":
// "https://upload.wikimedia.org/wikipedia/en/3/3d/Chennai_Super_Kings_Log
// o.svg" }
// ○ ]
// ● Display:
// ○ Team Logo
// ○ Team Name
// ○ Home Ground
// ○ Championships
// ● Search Bar:
// ○ Filter teams by name or stadium
// Technical Requirements:
// ● useEffect
// ● useState
// ● Fetch from local
// ● Real-time filtering

import axios from "axios";
import { useState , useEffect } from "react"

const IPLViewer = () => {
    const [teams , setTeams] = useState([]);
    const [filteredTeams , setFilteredTeams] = useState([]);
    const [searchTerm , setSearchTerm] = useState("");
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get("data.json");
                setTeams(response.data);
                setFilteredTeams(response.data);
                setLoading(false);
            }
            catch(err) {
                console.error(err);
                setError(err.message);
            }
        }
        fetchTeams();
    } , []);

    useEffect(() => {
        if(searchTerm == '') {
            setFilteredTeams(teams);
        }
        else {
            const filtered = teams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()) || team.homeGround.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredTeams(filtered);
        }
    },[searchTerm , teams])

    if(loading){
        return (
            <div>
                loading
            </div>
        )
    }
    if(error){
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>IPL TEAM VIEWER</h1>
            <div>
                <input type="text"
                placeholder="Search Team by name or homeground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <p>Showing {filteredTeams.length} Teams</p>
            <div>
                {filteredTeams.map((team , index) => (
                    <div key={index}>
                        <img src={team.logo} alt={`Logo for ${team.name}`} onError = {(e) => e.target.styles.display = "none"} />
                        <h3>{team.name}</h3>
                        <p>HomeGround : {team.homeGround}</p>
                        <p>Championships: {team.championships}</p>
                    </div>
                ))}
            </div>
            {filteredTeams.length && searchTerm && (
                <div>No Teams Matching for {searchTerm}</div>
            )}
        </div>
    )
}

export default IPLViewer;
