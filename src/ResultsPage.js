import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ResultsPage.css";


const ResultsPage = () => {
  const location = useLocation();
  const formDataArray = location.state;

  const formatFormData = (formData) => {
    return `####Problem Description:\n\n${formData.problemDescription}\n<hr />\n\n` +
           `####Input Format:\n\n${formData.inputFormat}\n<hr />\n\n` +
           `####Output Format:\n\n${formData.outputFormat}\n<hr />\n\n` +
           `####Constraints:\n\n${formData.constraints}\n<hr />\n\n` +
           `####Example Input:\n\n\`\`\`\n\n${formData.exampleInput}\n\n\`\`\`\n<hr />\n\n` +
           `####Example Output:\n\n\`\`\`\n\n${formData.exampleOutput}\n\n\`\`\`\n<hr />\n\n` +
           `####Explanation:\n\n${formData.explanation}`;
  };
  const handleNavigateHome = () => {
    navigate('/');
  };


  const convertToOneLine = (index) => {
    const newData = [...editableData];
    // Replace new lines with \n and double quotes with \"
    const formattedData = newData[index].replace(/\n/g, '\\n').replace(/"/g, '\\"');
    // Update the state with the new formatted data
    newData[index] = formattedData;
    setEditableData(newData);
  
    // Optionally, you may want to update the history as well
    const newHistory = [...history];
    const newHistoryIndex = [...historyIndex];
    newHistory[index].push(formattedData);
    newHistoryIndex[index] += 1;
    
    setHistory(newHistory);
    setHistoryIndex(newHistoryIndex);
  };

  const [editableData, setEditableData] = useState(formDataArray.map(formatFormData));
  const [history, setHistory] = useState(formDataArray.map(data => [formatFormData(data)]));
  const [historyIndex, setHistoryIndex] = useState(formDataArray.map(() => 0));

  
  const handleTextChange = (text, index) => {
    const newData = [...editableData];
    const newHistory = [...history];
    const newHistoryIndex = [...historyIndex];

    newData[index] = text;
    if (newHistory[index][newHistoryIndex[index]] !== text) {
      newHistory[index].push(text);
      newHistoryIndex[index] += 1;
    }
    
    setEditableData(newData);
    setHistory(newHistory);
    setHistoryIndex(newHistoryIndex);
  };
  

  const insertTag = (index, openTag, closeTag = '', block = false) => {
    const textarea = document.getElementById(`text-area-${index}`);
    const { value, selectionStart, selectionEnd } = textarea;
    const beforeText = value.substring(0, selectionStart);
    const selectedText = value.substring(selectionStart, selectionEnd);
    const afterText = value.substring(selectionEnd);
    const insertNewLine = block && beforeText.charAt(beforeText.length - 1) !== '\n' ? '\n' : '';

    const newText = selectionStart === selectionEnd
      ? `${beforeText}${insertNewLine}${openTag}${insertNewLine}${afterText}`
      : `${beforeText}${openTag}${selectedText}${closeTag}${afterText}`;

    handleTextChange(newText, index);
  };

  // Formatting functions
  const handleInlineCode = (index) => {
    insertTag(index, '`', '`', false);
  };
  
  const handleBlockCode = (index) => {
    insertTag(index, '```\n', '\n```', true);
  };
  const handleBoldText = (index) => insertTag(index, '<b>', '</b>');
  const handleHeading = (index, level) => insertTag(index, `${'#'.repeat(level)} `, '', true);
  const handleSingleLineNote = (index) => insertTag(index, '<SingleLineNote>', '</SingleLineNote>');
  const handleMultilineNote = (index) => insertTag(index, '<MultiLineNote>\n-', '\n</MultiLineNote>', true);
  const handleLineBreak = (index) => insertTag(index, '<br />', '', true);
  const handleHorizontalRule = (index) => insertTag(index, '<hr />', '', true);

  // Undo and redo functions
  const undoChange = (index) => {
    const newHistoryIndex = [...historyIndex];
    if (newHistoryIndex[index] > 0) {
      newHistoryIndex[index] -= 1;
      setHistoryIndex(newHistoryIndex);
      setEditableData(editableData.map((data, i) => i === index ? history[index][newHistoryIndex[index]] : data));
    }
  };

  const redoChange = (index) => {
    const newHistoryIndex = [...historyIndex];
    if (newHistoryIndex[index] < history[index].length - 1) {
      newHistoryIndex[index] += 1;
      setHistoryIndex(newHistoryIndex);
      setEditableData(editableData.map((data, i) => i === index ? history[index][newHistoryIndex[index]] : data));
    }
  };
  const navigate = useNavigate();
  
 
  
  // Submit all handler with conversion
  const handleSubmitAll = () => {
    // Convert the editableData back into the required format for DisplayPage
    const dataForSubmission = editableData.map((data, index) => {
      // Parse the markdown-like formatted data back into an object
      // Assuming formDataArray still contains the original objects to extract other properties if needed
      const originalData = formDataArray[index];
      return {
        problemDescription: originalData.problemDescription,
        code_language: originalData.code_language,
        company: originalData.company,
        inputFormat: originalData.inputFormat,
        outputFormat: originalData.outputFormat,
        short_text: originalData.short_text,
        constraints: originalData.constraints,
        exampleInput: originalData.exampleInput,
        exampleOutput: originalData.exampleOutput,
        explanation: originalData.explanation,
        // Add or modify fields as needed
        sample_input_2: originalData.sample_input_2 || "",
        sample_output_2: originalData.sample_output_2 || "",
        explanation_2: originalData.explanation_2 || "",
        resource_name: originalData.resource_name || "",
        resource_url: originalData.resource_url || "",
        sheet_1: originalData.sheet_1 || "",
        sheet_2: originalData.sheet_2 || "",
        sheet_3: originalData.sheet_3 || "",
        removal_of_code_data: originalData.removal_of_code_data || ""
      };
    });

    console.log('Data being submitted:', dataForSubmission);
    navigate('/display', { state: { data: dataForSubmission } });
  };
  

  return (
    <div>
      {editableData.map((data, index) => (
        <div key={index} className="form-data-container">
          
          <h2>Question {index + 1}</h2>
          <button onClick={handleNavigateHome} className="navigate-home-btn">
            Go to Home
          </button>
           
          <div className="button-toolbar">
            {/* Other buttons for formatting */}
            <button onClick={() => handleBoldText(index)}>Bold</button>
            <button onClick={() => handleHeading(index, 1)}>Heading 1</button>
            <button onClick={() => handleHeading(index, 2)}>Heading 2</button>
            <button onClick={() => handleHeading(index, 3)}>Heading 3</button>
            <button onClick={() => handleHeading(index, 4)}>Heading 4</button>
            <button onClick={() => handleSingleLineNote(index)}>SingleLine Note</button>
            <button onClick={() => handleMultilineNote(index)}>MultiLine Note</button>
            <button onClick={() => handleLineBreak(index)}>Line Break</button>
            <button onClick={() => handleHorizontalRule(index)}>Horizontal Rule</button>
            <button onClick={() => handleInlineCode(index)}>Inline Code</button>
            <button onClick={() => handleBlockCode(index)}>Block Code</button>
            <button onClick={() => undoChange(index)}>Undo</button>
            <button onClick={() => redoChange(index)}>Redo</button>
          </div>
          <textarea 
            id={`text-area-${index}`}
            value={data}
            className="form-data-textarea"
            onChange={(e) => handleTextChange(e.target.value, index)}
          />
          {/* Convert to 1 line button */}
          <button onClick={() => convertToOneLine(index)} className="convert-btn">
            Convert to 1 line
          </button>
          <button onClick={handleSubmitAll}>Submit All</button>
        </div>
      ))}
    </div>
  );
  
};

export default ResultsPage;

