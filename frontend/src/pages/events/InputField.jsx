import React, {useState} from 'react';

const InputField = ({ label, onValueChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);
        onValueChange(value);
    };
      
    return(
    <div>
          <label>Event name:</label>
          <input
            type="text"
            value={value}
            onChange={handleChange}
          />
    </div>
    );
}
 
export default InputField;
