import React, { useState, useEffect } from 'react';
import ModalComponent from '../components/QuizComponents/ModalComponent';
import HistoryModal from '../components/QuizComponents/HistoryModal';
import FieldRenderer from '../components/QuizComponents/FieldRenderer';
import { initializeResponses, compressAndEncode } from '../components/utils';
import './QuizForm.css';

const quizData = require('./quizData.json');

const QuizForm = () => {
  const [sections, setSections] = useState([]);
  const [responses, setResponses] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [historyModalIsOpen, setHistoryModalIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [tempQrContent, setTempQrContent] = useState(null);
  const [qrContent, setQrContent] = useState('');

  useEffect(() => {
    setSections(quizData.sections);
    setResponses(initializeResponses(quizData.sections));
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);
  }, []);

  const handleChange = (code, value) => {
    setResponses({
      ...responses,
      [code]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let content = JSON.stringify({
      ...responses,
      submissionTime: new Date().getTime()
    });
    content = compressAndEncode(content);
    setQrContent(content);

    const newSubmissions = [...submissions, content];
    setSubmissions(newSubmissions);
    localStorage.setItem('submissions', JSON.stringify(newSubmissions));

    setModalIsOpen(true);
  };

  const openHistoryModal = () => setHistoryModalIsOpen(true);
  const closeHistoryModal = () => setHistoryModalIsOpen(false);

  const openQrModal = (content) => {
    setTempQrContent(content);
    closeHistoryModal();
    setModalIsOpen(true);
  };

  const closeQrModal = () => {
    setModalIsOpen(false);
    setTempQrContent(null);
    if (historyModalIsOpen) {
      setHistoryModalIsOpen(true);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw" }}>
        <h1 style={{ color: "white" }}>{quizData.page_title}</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        {sections.map((section) => (
          <div key={section.name} className="quiz-container">
            <h2 className="section-title">{section.name}</h2>
            <div className="section-content">
              {section.fields.map((field) => (
                <div key={field.code} className="field-section">
                  <FieldRenderer field={field} onChange={handleChange} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="reset-button" onClick={() => setResponses(initializeResponses(sections))}>Reset Form</button>
          <button type="button" className="history-button" onClick={openHistoryModal}>View Submissions</button>
        </div>
      </form>
      <ModalComponent 
        isOpen={modalIsOpen} 
        closeModal={closeQrModal} 
        qrContent={tempQrContent || qrContent} 
      />
      <HistoryModal 
        isOpen={historyModalIsOpen} 
        closeModal={closeHistoryModal} 
        submissions={submissions} 
        openQrModal={openQrModal} 
      />
    </div>
  );
};

export default QuizForm;