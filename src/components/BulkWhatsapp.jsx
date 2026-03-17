import { useState } from "react";
import "./BulkWhatsapp.css";

export default function BulkWhatsapp() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!file) {
            alert("Please upload a CSV file");
            return;
        }

        if (!message.trim()) {
            alert("Please enter a message");
            return;
        }

        const formData = new FormData();
        formData.append("data", file);
        formData.append("message", message);

        setLoading(true);

        const res = await fetch(
            "https://primary-production-e368b.up.railway.app/webhook/df820d88-035b-492c-9a9d-4c8d821f12f0",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();

        setResult(data);
        setLoading(false);
    };

    return (
        <div className="page">

            <div className="glow"></div>

            <div className="card">

                <h1 className="title">🚀 Bulk WhatsApp Sender</h1>

                <label>Upload Contacts CSV</label>

                <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e)=>setFile(e.target.files[0])}
                    className="input"
                />

                <label>Message</label>

                <textarea
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    rows="4"
                    className="textarea"
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="button"
                >
                    {loading ? "Sending..." : "Send Bulk WhatsApp"}
                </button>

                {loading && <p>Sending messages...</p>}

                {result && (

                    <div className="result">

                        <h3>API Result</h3>

                        <p><b>Result:-</b> {result.campaign}</p>

                        <p>Total Contacts: {result.total_contacts}</p>

                        <p style={{color:"#22c55e"}}>
                            Messages Sent: {result.messages_sent}
                        </p>

                        <p style={{color:"#ef4444"}}>
                            Failed: {result.failed}
                        </p>

                        <div className="progress-bg">

                            <div
                                className="progress-fill"
                                style={{
                                    width:`${(result.messages_sent/result.total_contacts)*100}%`
                                }}
                            />

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}