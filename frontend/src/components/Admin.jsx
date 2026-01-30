import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Admin() {
    const [username, setUsername] = useState(() => localStorage.getItem("adminUsername") || "");
    const [password, setPassword] = useState(() => localStorage.getItem("adminPassword") || "");
    const [usernameInput, setUsernameInput] = useState(username);
    const [passwordInput, setPasswordInput] = useState(password);
    const [activeTab, setActiveTab] = useState("projects");

    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const [projectForm, setProjectForm] = useState({ name: "", type: "", location: "", imageUrl: "" });
    const [clientForm, setClientForm] = useState({ name: "", image: "", description: "", designation: "" });

    const [status, setStatus] = useState("");

    const authHeaders = useMemo(() => {
        if (!username || !password) {
            return {};
        }

        const basic = btoa(`${username}:${password}`);
        return { Authorization: `Basic ${basic}` };
    }, [username, password]);

    const saveCredentials = () => {
        localStorage.setItem("adminUsername", usernameInput);
        localStorage.setItem("adminPassword", passwordInput);
        setUsername(usernameInput);
        setPassword(passwordInput);
        setStatus("Admin credentials updated");
        setTimeout(() => setStatus(""), 2000);
    };

    const fetchProjects = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}api/projects`)
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    };

    const fetchClients = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}api/clients`)
            .then(res => setClients(res.data))
            .catch(err => console.error(err));
    };

    const fetchContacts = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}api/contact`, { headers: authHeaders })
            .then(res => setContacts(res.data))
            .catch(err => console.error(err));
    };

    const fetchSubscriptions = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}api/subscribe`, { headers: authHeaders })
            .then(res => setSubscriptions(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProjects();
        fetchClients();
        if (username && password) {
            fetchContacts();
            fetchSubscriptions();
        }
    }, [username, password]);

    const addProject = (e) => {
        e.preventDefault();
        setStatus("");

        axios.post(`${process.env.REACT_APP_API_BASE_URL}api/projects`, projectForm, { headers: authHeaders })
            .then(() => {
                setProjectForm({ name: "", type: "", location: "", imageUrl: "" });
                setStatus("Project added successfully");
                fetchProjects();
            })
            .catch(() => setStatus("Failed to add project (check admin token)"));
    };

    const addClient = (e) => {
        e.preventDefault();
        setStatus("");

        axios.post(`${process.env.REACT_APP_API_BASE_URL}api/clients`, clientForm, { headers: authHeaders })
            .then(() => {
                setClientForm({ name: "", image: "", description: "", designation: "" });
                setStatus("Client added successfully");
                fetchClients();
            })
            .catch(() => setStatus("Failed to add client (check admin token)"));
    };

    const deleteProject = (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            axios.delete(`${process.env.REACT_APP_API_BASE_URL}api/projects/${id}`, { headers: authHeaders })
                .then(() => {
                    setStatus("Project deleted successfully");
                    fetchProjects();
                })
                .catch(() => setStatus("Failed to delete project"));
        }
    };

    const deleteClient = (id) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            axios.delete(`${process.env.REACT_APP_API_BASE_URL}api/clients/${id}`, { headers: authHeaders })
                .then(() => {
                    setStatus("Client deleted successfully");
                    fetchClients();
                })
                .catch(() => setStatus("Failed to delete client"));
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <button className="admin-logout" onClick={() => {
                    localStorage.removeItem("adminUsername");
                    localStorage.removeItem("adminPassword");
                    window.location.href = "/";
                }}>Logout</button>
            </div>

            {status && <p className="admin-status">{status}</p>}

            <div className="admin-tabs">
                <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>Projects</button>
                <button className={activeTab === "clients" ? "active" : ""} onClick={() => setActiveTab("clients")}>Clients</button>
                <button className={activeTab === "contacts" ? "active" : ""} onClick={() => setActiveTab("contacts")}>Contact Responses</button>
                <button className={activeTab === "subscriptions" ? "active" : ""} onClick={() => setActiveTab("subscriptions")}>Subscriptions</button>
            </div>

            {activeTab === "projects" && (
                <div className="admin-section">
                    <h2>Project Management</h2>
                    <form className="admin-form" onSubmit={addProject}>
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={projectForm.name}
                            onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Project Type"
                            value={projectForm.type}
                            onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Project Location"
                            value={projectForm.location}
                            onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Project Image URL"
                            value={projectForm.imageUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            required
                        />
                        <button type="submit">Add Project</button>
                    </form>

                    <h3>Existing Projects</h3>
                    <div className="admin-cards-grid">
                        {projects.map(project => (
                            <div key={project.id} className="admin-display-card">
                                {project.imageUrl && (
                                    <img src={project.imageUrl} alt={project.name} className="admin-card-image" />
                                )}
                                <div className="admin-card-content">
                                    <h4>{project.name}</h4>
                                    <p className="admin-card-type">{project.type}</p>
                                    <p className="admin-card-location">📍 {project.location}</p>
                                    <button className="admin-delete-btn" onClick={() => deleteProject(project.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "clients" && (
                <div className="admin-section">
                    <h2>Client Management</h2>
                    <form className="admin-form" onSubmit={addClient}>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={clientForm.name}
                            onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Client Image URL"
                            value={clientForm.image}
                            onChange={(e) => setClientForm({ ...clientForm, image: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Client Designation"
                            value={clientForm.designation}
                            onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Client Description"
                            value={clientForm.description}
                            onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                            required
                        />
                        <button type="submit">Add Client</button>
                    </form>

                    <h3>Existing Clients</h3>
                    <div className="admin-cards-grid">
                        {clients.map(client => (
                            <div key={client.id} className="admin-display-card">
                                {client.image && (
                                    <img src={client.image} alt={client.name} className="admin-card-image" />
                                )}
                                <div className="admin-card-content">
                                    <h4>{client.name}</h4>
                                    <p className="admin-card-type">{client.designation}</p>
                                    <p className="admin-card-description">{client.description}</p>
                                    <button className="admin-delete-btn" onClick={() => deleteClient(client.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "contacts" && (
                <div className="admin-section">
                    <h2>Contact Responses</h2>
                    <button className="admin-refresh" onClick={fetchContacts}>Refresh</button>
                    <div className="admin-table">
                        <div className="admin-row header">
                            <span>Name</span>
                            <span>Email</span>
                            <span>Phone</span>
                            <span>City</span>
                        </div>
                        {contacts.map(contact => (
                            <div key={contact.id} className="admin-row">
                                <span>{contact.name}</span>
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                                <span>{contact.city}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "subscriptions" && (
                <div className="admin-section">
                    <h2>Subscribed Emails</h2>
                    <button className="admin-refresh" onClick={fetchSubscriptions}>Refresh</button>
                    <div className="admin-table">
                        <div className="admin-row header single">
                            <span>Email</span>
                        </div>
                        {subscriptions.map(sub => (
                            <div key={sub.id} className="admin-row single">
                                <span>{sub.email}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
