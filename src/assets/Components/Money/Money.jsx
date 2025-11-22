import React, { useEffect, useState } from 'react';
import './Money.css';

const Money = ({ value = 0 }) => {
    const [formattedValue, setFormattedValue] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Format the value as USD currency without decimals
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        });
        setFormattedValue(formatter.format(value));

        // Reset animation state then trigger it
        setIsAnimating(false);
        const timer = setTimeout(() => setIsAnimating(true), 50);
        return () => clearTimeout(timer);
    }, [value]);

    // Helper to create the digit track
    const renderDigit = (digit, index) => {
        if (isNaN(digit)) {
            return <span key={index} className="comma">{digit}</span>;
        }

        // Calculate iterations based on index to create a staggered effect
        const additionalIterationCount = 5;
        const iterations = index + additionalIterationCount;

        const trackDigits = [];
        for (let i = 0; i < iterations; i++) {
            for (let j = 0; j <= 9; j++) {
                trackDigits.push(j);
            }
        }

        const targetIndex = ((iterations - 1) * 10) + parseInt(digit);
        // Using 'em' allows us to scale the component via CSS font-size.
        // Each digit height is 1em.
        const translateY = targetIndex * -1;

        return (
            <span key={index} className="digit-wrapper">
                <span
                    className="digit-track"
                    style={{
                        transform: `translateY(${translateY}em)`,
                        transitionDuration: '1000ms'
                    }}
                >
                    {trackDigits.map((d, i) => (
                        <span key={i}>{d}</span>
                    ))}
                </span>
            </span>
        );
    };

    return (
        <div className="money-container">
            <div className="money-text">
                {formattedValue.split('').map((char, index) => renderDigit(char, index))}
            </div>
        </div>
    );
};

export default Money;