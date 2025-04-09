
import React, { useState } from 'react';
import styles from './style.module.css';
import { uploadFiles } from '../../API/upload.js';

function Input() {
  const [excelFile, setExcelFile] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate file types
    if (!excelFile || !templateFile) {
      alert("Please upload both files.");
      return;
    }

    setIsLoading(true); // Start the spinner

    try {
      const result = await uploadFiles(excelFile, templateFile); // Upload
      // alert("Files uploaded successfully!");
      console.log(result);
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    } finally {
      setIsLoading(false); // Stop the spinner
    }
  };

  return (
    <div className={styles.main}>
      <h2>Upload Certificate Data and Template</h2>
      <div className={styles.inputdiv}>
        <div className={styles.fileGroup}>
          <label htmlFor="excelFile">Upload Excel File:</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            id="excelFile"
            onChange={(e) => 
            {
              if (e.target.files[0] && !e.target.files[0].name.endsWith('.xlsx') && !e.target.files[0].name.endsWith('.xls')) {
              alert("Please upload a valid Excel file (.xlsx or .xls).");
             }else{
              setExcelFile(e.target.files[0])
             }
            }
           }
            disabled={isLoading}
          />
        </div>

        <div className={styles.fileGroup}>
          <label htmlFor="templateFile">Upload Template File (Word file only):</label>
          <input
            type="file"
            accept=".doc, .docx"
            id="templateFile"
            onChange={(e) => 
            {
              if(e.target.files[0] && !e.target.files[0].name.endsWith('.doc') && !e.target.files[0].name.endsWith('.docx')) {
              alert("Please upload a valid Word template file (.doc or .docx).");
              }else{
                setTemplateFile(e.target.files[0])
                }
            }
           }
            disabled={isLoading}
          />
        </div>

        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <span className={styles.spinner}></span> : "Generate"}
        </button>
      </div>
    </div>
  );
}

export default Input;
