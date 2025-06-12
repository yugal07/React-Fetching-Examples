// 3. NASA Astronomy Picture Explorer
// ● Objective:
// Build a NASA Astronomy Picture Explorer that fetches and displays the
// Astronomy Picture of the Day.
// Functionality Requirements:
// ● Fetch Data:
// ○ NASA API: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
// ● Sample Response:
// {
// ● "title": "Aurora over Norway",
// ● "url": "https://apod.nasa.gov/apod/image/2101/AuroraNorway.jpg",
// ● "explanation": "A beautiful display of aurora seen from northern Norway.",
// ● "date": "2025-01-10"
// ○ }
// ● Display:
// ○ Title
// ○ Image
// ○ Explanation
// ○ Date
// Technical Requirements:
// ● useEffect for data fetch on mount
// ● useState
// ● Responsive image display
// 4. Daily Bhajan Finder

import axios from "axios";
import { useEffect , useState} from "react";

const NASAAstronomyExplorer = () => {
    const [nasaData , setNasaData] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
                setNasaData(response.data);
                setLoading(false)
            } catch(err) {
                console.error(err);
                setError("Data did not fetch did you write the correct code?")
                setLoading(false)
            }
        }
        fetchData();
    } , [])
    if(loading) {
        return (
            <div>
                loading
            </div>
        )
    }
    if(error) {
        return (
            <div>{error}
            <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        )
    }
    return (
        <div>
            <h1>NASA ASTRONOMY PICTURE</h1>
            <div>
                {nasaData && (
                    <div>
                        {nasaData.media_type = 'image' ? (
                            <img src={nasaData.url} alt={nasaData.title} />
                        ) : nasaData.media_type = 'video' ? (
                            <div>
                                <iframe src={nasaData.url} alt = {nasaData.title} allowFullScreen />
                            </div>
                        ): null}  
                    </div>
                )}
            </div>
            <p>{nasaData.explanation}</p>
        </div>
    )
}
export default NASAAstronomyExplorer