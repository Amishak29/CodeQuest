import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./DisplayPage.css";

const DisplayPage = () => {
  const { state } = useLocation();
  // const navigate = useNavigate();

  // Initialize with the provided data, converting each problem's details into objects.
  const [problemDetails, setProblemDetails] = useState(
    state?.data.map((item) => ({
      problem_text: item.problemDescription,
      code_language: "PYTHON",
      company: "",
      input_Format: item.inputFormat,
      outputFormat: item.outputFormat,
      short_text: "",
      constraints: item.constraints,
      sample_input: item.exampleInput,
      sample_output: item.exampleOutput,
      explanation: item.explanation,
      sample_input_2: "",
      sample_output_2: "",
      explanation_2: "",
      resource_name: "NI_ASSESSMENT_SKALABLE",
      resource_url: "",
      sheet_1: "TRUE",
      sheet_2: "TRUE",
      sheet_3: "TRUE",
      removal_of_code_data: "TRUE"
    })) || []
  );

  // State for the combined JSON object displayed in the textarea.
  const [combinedDetails, setCombinedDetails] = useState('');

  // Whenever problemDetails changes, update the combinedDetails.
  useEffect(() => {
    setCombinedDetails(JSON.stringify(problemDetails, null, 2));
  }, [problemDetails]);

  const handleDetailsChange = (index, field, value) => {
    const updatedDetails = [...problemDetails];
    updatedDetails[index][field] = value;
    setProblemDetails(updatedDetails);
  };

  const handleCombinedDetailsChange = (value) => {
    setCombinedDetails(value);
    try {
      const parsedDetails = JSON.parse(value);
      if (Array.isArray(parsedDetails)) {
        setProblemDetails(parsedDetails);
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  };
  const handleCopyText = () => {
    // Create a textarea element to copy the text to the clipboard
    const textArea = document.createElement('textarea');
    textArea.value = combinedDetails;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    // Optionally, you can show a notification that the text has been copied
    alert("Text copied to clipboard!");
  };
  if (problemDetails.length === 0) {
    return <div>No data provided</div>;
  }

  return (
    <div className="display-page">
      
      {problemDetails.map((details, index) => (
        <div key={index} className="problem-container">
         
    
          <h2>Problem {index + 1}</h2>
          
          <div className="field-container">
            
            <label htmlFor={`company-${index}`}>Company:</label>
            <input
              id={`company-${index}`}
              type="text"
              value={details.company}
              onChange={(e) => handleDetailsChange(index, 'company', e.target.value)}
            />
          </div>
          <div className="field-container">
            <label htmlFor={`code-language-${index}`}>Code Language:</label>
            <input
              id={`code-language-${index}`}
              type="text"
              value={details.code_language}
              onChange={(e) => handleDetailsChange(index, 'code_language', e.target.value)}
            />
          </div>
          <div className="field-container">
            <label htmlFor={`short-text-${index}`}>Short Text:</label>
            <input
              id={`short-text-${index}`}
              type="text"
              value={details.short_text}
              onChange={(e) => handleDetailsChange(index, 'short_text', e.target.value)}
            />
          </div>
          <div className="field-container">
            <label htmlFor={`sample-input-2-${index}`}>Sample Input 2:</label>
            <input
              id={`sample-input-2-${index}`}
              type="text"
              value={details.sample_input_2}
              onChange={(e) => handleDetailsChange(index, 'sample_input_2', e.target.value)}
            />
          </div>
          <div className="field-container">
            <label htmlFor={`sample-output-2-${index}`}>Sample Output 2:</label>
            <input
              id={`sample-output-2-${index}`}
              type="text"
              value={details.sample_output_2}
              onChange={(e) => handleDetailsChange(index, 'sample_output_2', e.target.value)}
            />
          </div>
          <div className="field-container">
            <label htmlFor={`explanation-2-${index}`}>Explanation 2:</label>
            <input
              id={`explanation-2-${index}`}
              type="text"
              value={details.explanation_2}
              onChange={(e) => handleDetailsChange(index, 'explanation_2', e.target.value)}
            />
          </div>
          <div className="field-container">
            <label htmlFor={`resource-name-${index}`}>Resource Name:</label>
            <input
              id={`resource-name-${index}`}
              type="text"
              value={details.resource_name}
              onChange={(e) => handleDetailsChange(index, 'resource_name', e.target.value)}
            />
          </div>
          <div className="field-container">
            <label htmlFor={`resource-url-${index}`}>Resource URL:</label>
            <input
              id={`resource-url-${index}`}
              type="text"
              value={details.resource_url}
              onChange={(e) => handleDetailsChange(index, 'resource_url', e.target.value)}
            />
          </div>
        </div>
      ))}
      <div className="problem-container">
        <h2>All Problems</h2>
        <textarea
          value={combinedDetails}
          onChange={(e) => handleCombinedDetailsChange(e.target.value)}
          className="editable-textarea"
          rows="15"
          style={{ width: '100%' }}
        />
        <button className="copy-button" onClick={handleCopyText}>Copy Text</button>

      </div>
    </div>
  );
};

export default DisplayPage;
