import axios from "axios";
import { useEffect, useState } from "react";

function Clients() {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/clients")
            .then(res => setClients(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Happy Clients</h2>

            {clients.length === 0 && <p>No clients found</p>}

            <div className="card-list">
                {clients.map(client => (
                    <div className="card" key={client.id}>
                        <h3>{client.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Clients;
