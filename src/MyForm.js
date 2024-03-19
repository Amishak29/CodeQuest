import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyForm.css'; 

const MyForm = () => {
  const navigate = useNavigate();
  const [formDatas, setFormDatas] = useState([{
    problemDescription: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    exampleInput: '',
    exampleOutput: '',
    explanation: '',
  }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newFormDatas = [...formDatas];
    newFormDatas[index][name] = value;
    setFormDatas(newFormDatas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/results', { replace: true, state: formDatas });
  };

  const handleAddForm = () => {
    setFormDatas([...formDatas, {
      problemDescription: '',
      inputFormat: '',
      outputFormat: '',
      constraints: '',
      exampleInput: '',
      exampleOutput: '',
      explanation: '',
    }]);
  };

  const handleRemoveForm = (index) => {
    const newFormDatas = formDatas.filter((_, idx) => idx !== index);
    setFormDatas(newFormDatas);
  };

  return (
    <div className="form-container">
      {formDatas.map((formData, index) => (
        <div key={index} className="dynamic-form">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor={`problemDescription-${index}`}>Problem Description:</label>
              <textarea
                id={`problemDescription-${index}`}
                name="problemDescription"
                placeholder="Describe the problem..."
                value={formData.problemDescription}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`inputFormat-${index}`}>Input Format:</label>
              <input
                type="text"
                id={`inputFormat-${index}`}
                name="inputFormat"
                placeholder="e.g., The first line contains..."
                value={formData.inputFormat}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`outputFormat-${index}`}>Output Format:</label>
              <input
                type="text"
                id={`outputFormat-${index}`}
                name="outputFormat"
                placeholder="e.g., Print the result..."
                value={formData.outputFormat}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`constraints-${index}`}>Constraints:</label>
              <textarea
                id={`constraints-${index}`}
                name="constraints"
                placeholder="e.g., 1 ≤ N ≤ 10^5"
                value={formData.constraints}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`exampleInput-${index}`}>Example Input:</label>
              <input
                type="text"
                id={`exampleInput-${index}`}
                name="exampleInput"
                placeholder="e.g., 5"
                value={formData.exampleInput}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`exampleOutput-${index}`}>Example Output:</label>
              <input
                type="text"
                id={`exampleOutput-${index}`}
                name="exampleOutput"
                placeholder="e.g., 120"
                value={formData.exampleOutput}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`explanation-${index}`}>Explanation:</label>
              <textarea
                id={`explanation-${index}`}
                name="explanation"
                placeholder="Provide a detailed explanation..."
                value={formData.explanation}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            {formDatas.length > 1 && (
              <button type="button" className="remove-button" onClick={() => handleRemoveForm(index)}>Remove</button>
            )}
          </form>
        </div>
      ))}
      <button type="button" onClick={handleAddForm} className="add-button">Add More</button>
      <button type="submit" onClick={handleSubmit} className="submit-all-button">Submit All</button>
    </div>
  );
};

export default MyForm;
