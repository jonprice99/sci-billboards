import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, onChange, defaultPlaceholder }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onChange(selectedValue);
    };

    return (
        <select value={selectedOption} onChange={handleSelectChange}>
            <option value="" disabled hidden>
                {defaultPlaceholder}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    defaultPlaceholder: PropTypes.string.isRequired,
};

export default Dropdown;

