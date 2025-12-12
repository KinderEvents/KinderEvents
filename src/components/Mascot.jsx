import React from 'react';
import { Bot, MessageCircle } from 'lucide-react';
import '../styles/Mascot.css';

const Mascot = () => {
    return (
        <div className="mascot-container">
            <div className="speech-bubble">
                Pssst... Teste mon cerveau IA ici ! 👇
            </div>
            <div className="mascot-body">
                {/* Use the generated 3D image */}
                <img
                    src="/assets/mascot_final_v3.png"
                    alt="Mascotte VisionR"
                    className="mascot-image"
                    onError={(e) => {
                        e.target.style.display = 'none'; // Hide if fails
                        e.target.nextSibling.style.display = 'block'; // Show fallback
                    }}
                />
                {/* Fallback Icon */}
                <Bot size={80} className="mascot-icon-fallback" style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default Mascot;
