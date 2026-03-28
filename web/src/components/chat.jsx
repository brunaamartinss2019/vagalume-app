import { useEffect, useState, useRef } from "react";
import { getMessages, sendMessage } from "../services/api-service";
import { useAuth } from "../context/auth-context";

function Chat({ bookingId }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        getMessages(bookingId).then(setMessages);
    }, [bookingId]);

    // Scroll automático al último mensaje
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleSend(e) {
        e.preventDefault();
        if (!text.trim()) return;

        const newMessage = await sendMessage(bookingId, text);
        setMessages([...messages, newMessage]);
        setText("");
    }

    return (
        <div className="border rounded p-3 mt-4" style={{ borderRadius: '12px' }}>
            <h6 className="fw-bold mb-3">💬 Mensajes</h6>

            {/* Lista de mensajes */}
            <div style={{ height: '250px', overflowY: 'auto', marginBottom: '12px' }}>
                {messages.length === 0 ? (
                    <p className="text-muted text-center" style={{ fontSize: '0.85rem' }}>
                        No hay mensajes aún
                    </p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`d-flex mb-2 ${msg.sender.id === user.id ? 'justify-content-end' : 'justify-content-start'}`}
                        >
                            {/* Avatar — solo si es el otro */}
                            {msg.sender.id !== user.id && (
                                <img
                                    src={msg.sender.avatar}
                                    alt={msg.sender.name}
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }}
                                />
                            )}

                            <div style={{
                                backgroundColor: msg.sender.id === user.id ? '#2563a8' : '#f0f0f0',
                                color: msg.sender.id === user.id ? 'white' : '#333',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                maxWidth: '70%',
                                fontSize: '0.9rem'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input para enviar */}
            <form onSubmit={handleSend} className="d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe un mensaje..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ borderRadius: '20px' }}
                />
                <button
                    type="submit"
                    className="btn fw-bold text-white"
                    style={{ backgroundColor: '#2563a8', borderRadius: '20px', padding: '8px 16px' }}
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Chat;
