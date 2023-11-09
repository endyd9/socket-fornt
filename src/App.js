import './App.css';
import io from "socket.io-client"
import {useEffect, useState} from "react";

function App() {

    const [token, setToken] = useState("")
    const [id, setId] = useState()

    const connectSocket = () => {
        const ws = io.connect('http://localhost:4000', {
            auth: {
                token
            }
        })
        ws.on('event', () => {
            console.log("ㅎㅇ")
        })
        ws.on("message", (msg) => {
            console.log(msg)
        })
        ws.on('event2', () => {
            console.log('ㅂㅇ')
        })
    }

    const getToken = async () => {
        await fetch(`http://localhost:4000/${id}`).then(async (res) => {
            const {token} = await res.json()
            setToken(token)
        }).finally(() => connectSocket())

    }



    return (
        <div className="App">
            <h1>sockettest</h1>
            <button onClick={async () => {
                await fetch("http://localhost:4000/alert/a")
            }}>event
            </button>
            <button onClick={async () => {
                await fetch("http://localhost:4000/alert/b")
            }}>event2
            </button>
            <input type="text"  value={id} onChange={(e) => setId(() => e.target.value)}/>
            <button onClick={getToken}>getToken</button>
        </div>
    );
}

export default App;
