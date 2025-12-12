import React, { useEffect } from 'react';

const CalendlyWidget = () => {
    useEffect(() => {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head.appendChild(script);

        return () => {
            // cleanup if needed
        };
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/benjamincode/visionr-demo"
            style={{ minWidth: '320px', height: '700px' }}
        />
    );
};

export default CalendlyWidget;
