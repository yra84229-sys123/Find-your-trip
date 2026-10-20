import React, { useState, useEffect, useRef } from 'react';

export default function CustomSelect({ options, selectedValue, onChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    const selectedOption = options.find(o => o.value === selectedValue);
    const displayLabel = selectedOption ? selectedOption.label : (placeholder || "Select...");

    return (
        <div className="custom-select-container" ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
            <div 
                className={`custom-select-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-light)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: selectedValue ? 'var(--text-main)' : 'var(--text-muted)',
                    transition: 'var(--transition)',
                    userSelect: 'none'
                }}
            >
                <span>{displayLabel}</span>
                <i className="fa-solid fa-chevron-down" style={{ 
                    fontSize: '0.85rem', 
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    color: 'var(--text-muted)'
                }}></i>
            </div>

            {isOpen && (
                <div 
                    className="custom-select-options fade-in-section"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        width: '100%',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        background: 'var(--bg-panel)',
                        backdropFilter: 'var(--glass-blur)',
                        WebkitBackdropFilter: 'var(--glass-blur)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        zIndex: 100,
                        padding: '10px 0'
                    }}
                >
                    {options.map(option => (
                        <div 
                            key={option.value}
                            className="dropdown-option"
                            onClick={() => handleSelect(option.value)}
                        >
                            <span>{option.label}</span>
                            {selectedValue === option.value && <i className="fa-solid fa-check" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
