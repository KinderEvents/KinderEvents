import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Copy, Aperture, Palette, Zap } from 'lucide-react';
import '../styles/EcstasyAI.css';

const EcstasyAI = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        subject: '',
        style: 'Cinematic',
        lighting: 'Volumetric',
        camera: '85mm f/1.8',
        vibe: 'Hyper-Realistic'
    });

    useEffect(() => {
        if (location.state?.subject) {
            setFormData(prev => ({ ...prev, subject: location.state.subject }));
        }
    }, [location]);

    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const styles = ['Cinematic', 'Cyberpunk', 'Studio Photography', 'Anime', 'Oil Painting', '3D Render', 'Minimalist'];
    const lightings = ['Volumetric', 'Neon Lights', 'Golden Hour', 'Studio Softbox', 'Dramatic', 'Natural'];
    const cameras = ['85mm f/1.8', '35mm Wide Angle', 'Macro Lens', 'Drone Shot', 'GoPro'];
    const vibes = ['Hyper-Realistic', 'Dreamy', 'Dark & Gritty', 'Vibrant', 'Pastel'];

    const handleGenerate = () => {
        if (!formData.subject) return;
        setIsGenerating(true);

        // Simulate "Thinking" time for effect
        setTimeout(() => {
            const prompt = `/imagine prompt: ${formData.subject}, ${formData.style} style, ${formData.lighting} lighting, shot on ${formData.camera}, ${formData.vibe}, highly detailed, 8k, unreal engine 5 render --ar 16:9 --v 6.0`;
            setGeneratedPrompt(prompt);
            setIsGenerating(false);
        }, 1500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPrompt);
        alert("Prompt copié !");
    };

    return (
        <div className="ecstasy-page container">
            <div className="ecstasy-header">
                <Sparkles size={48} className="ecstasy-icon" />
                <h1 className="ecstasy-title">ECSTASY <span className="text-purple">AI</span></h1>
                <p className="ecstasy-subtitle">Le Générateur de Prompts Ultime pour Créateurs Visionnaires.</p>
            </div>

            <div className="glass-panel ecstasy-interface">
                <div className="input-group full-width">
                    <label>Votre Idée (Sujet)</label>
                    <input
                        type="text"
                        placeholder="Ex: Une chaussure Nike en lévitation..."
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                </div>

                <div className="controls-grid">
                    <div className="control-group">
                        <label><Palette size={16} /> Style</label>
                        <select onChange={(e) => setFormData({ ...formData, style: e.target.value })}>
                            {styles.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="control-group">
                        <label><Zap size={16} /> lighting</label>
                        <select onChange={(e) => setFormData({ ...formData, lighting: e.target.value })}>
                            {lightings.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="control-group">
                        <label><Aperture size={16} /> Camera</label>
                        <select onChange={(e) => setFormData({ ...formData, camera: e.target.value })}>
                            {cameras.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="control-group">
                        <label><Sparkles size={16} /> Vibe</label>
                        <select onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}>
                            {vibes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <button
                    className={`btn-ecstasy ${isGenerating ? 'generating' : ''}`}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                >
                    {isGenerating ? 'Génération en cours...' : 'GÉNÉRER LE PROMPT MAGIQUE ✨'}
                </button>

                {generatedPrompt && (
                    <div className="result-box fade-in-section visible">
                        <h3>Votre Prompt Optimisé :</h3>
                        <div className="prompt-content">
                            {generatedPrompt}
                        </div>
                        <button className="btn-copy" onClick={copyToClipboard}>
                            <Copy size={18} /> Copier
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EcstasyAI;
