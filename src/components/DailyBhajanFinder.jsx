// 4. Daily Bhajan Finder
// ● Objective:
// Build a Daily Bhajan Finder that shows a devotional song of the day with play
// functionality.
// Functionality Requirements:
// ● Fetch Data:
// ○ From data. in /public
// ● Sample data.:
// [
// ● { "date": "2025-05-26", "title": "Shri Ram Jai Ram", "singer": "Anuradha
// Paudwal", "audio": "https://www.sample-videos.com/audio/mp3/wave.mp3"
// }
// ○ ]
// ● Display:
// ○ Title
// ○ Singer
// ○ Audio Player
// Technical Requirements:
// ● useState
// ● useEffect
// ● Date filtering
// ● <audio> tag

import { useEffect , useState } from "react";
import axios from "axios";

const DailyBhajanFinder = () => {
    const [bhajans , setBhajans] = useState(null);
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState("")

    const getTodaysDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/bhajan.json")
                const allBhajans = response.data;
                const todaysDate = getTodaysDate();

                const todayBhajan = allBhajans.find((bhajan) => bhajan.date == todaysDate);
                if(todayBhajan) {
                    setBhajans(todayBhajan);
                }
                else {
                    setBhajans(allBhajans[0] || null);
                }
                setLoading(false)
            }
            catch(err) {
                console.error(err);
                setError("Doesnot fetch the data, please get help from developer")
                setLoading(false)
            }
        }
        fetchData();
    } , [])

    if(loading) {
        return (
            <div>
                loading.. Please wait
            </div>
        )
    }
    if(error) {
        return (
            <div>
                <h1>{error}</h1>
                <button onClick={() => window.location.reload()}>retry</button>
            </div>
        )
    }
    if (!bhajans) {
    return (
        <div>
            No Bhajans for today, sorry
        </div>
    );
}

return (
    <div>
        <h1>Bhajan App</h1>
        <h2>{bhajans.title}</h2>
        <p>{bhajans.singer}</p>
        <audio controls>
            <source src={bhajans.audio} type="audio/mpeg" />
            Your browser does not support the audio playing
        </audio>
        <p>Date: {bhajans.date}</p>
    </div>
);

}

export default DailyBhajanFinder;