import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { QRCodeCanvas } from 'qrcode.react';
import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import SelectField from '../components/SelectField';
import BooleanField from '../components/BooleanField';
import CounterField from '../components/CounterField';
import './QuizForm.css';

Modal.setAppElement('#root');

const quizData = require('./quizData.json');
const LZUTF8 = require('lzutf8');

const initializeResponses = (sections) => {
  const initialResponses = {};
  sections.forEach(section => {
    section.fields.forEach(field => {
      initialResponses[field.code] = field.defaultValue !== undefined ? field.defaultValue : '';
    });
  });
  return initialResponses;
};

const QuizForm = () => {
  const [sections, setSections] = useState([]);
  const [responses, setResponses] = useState({});
  const [qrContent, setQrContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [historyModalIsOpen, setHistoryModalIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [tempQrContent, setTempQrContent] = useState(null);

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

  const decompressAndDecode = (content) => {
    return LZUTF8.decompress(content, { inputEncoding: 'Base64', outputEncoding: 'String' });
  };

  const compressAndEncode = (content) => {
    return LZUTF8.compress(content, { outputEncoding: 'Base64' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let content = JSON.stringify({
      ...responses,
      submissionTime: new Date().getTime()
    });
    content = compressAndEncode(content);
    setQrContent(content);

    // Save submission to local storage
    const newSubmissions = [...submissions, content];
    setSubmissions(newSubmissions);
    localStorage.setItem('submissions', JSON.stringify(newSubmissions));

    setModalIsOpen(true);
  };

  const openHistoryModal = () => {
    setHistoryModalIsOpen(true);
  };

  const closeHistoryModal = () => {
    setHistoryModalIsOpen(false);
  };

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

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.code}
            field={field}
            onChange={handleChange}
          />
        );
      case 'number':
        return (
          <NumberField
            key={field.code}
            field={field}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <SelectField
            key={field.code}
            field={field}
            onChange={handleChange}
          />
        );
      case 'boolean':
        return (
          <BooleanField
            key={field.code}
            field={field}
            onChange={handleChange}
          />
        );
      case 'counter':
        return (
          <CounterField
            key={field.code}
            field={field}
            onChange={handleChange}
          />
        );
      default:
        return null;
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
                  {renderField(field)}
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeQrModal} className="modal" overlayClassName="overlay">
        <div className="modal-content">
          <QRCodeCanvas
            value={tempQrContent || qrContent}
            size={256}
            level="L" 
            includeMargin={true} 
          />
          <p>{tempQrContent || qrContent}</p>

          <p>Decompressed and Decoded: {decompressAndDecode(tempQrContent || qrContent)}</p>

          <button onClick={closeQrModal} className="close-button">Close</button>
        </div>
      </Modal>
      <Modal isOpen={historyModalIsOpen} onRequestClose={closeHistoryModal} className="modal" overlayClassName="overlay">
        <div className="modal-content">
          <h2>Submission History</h2>
          <div className="history-content">
            {Object.entries(submissions).map(([key, value]) => {
              const decodedValue = JSON.parse(decompressAndDecode(value));
              return (
                <div key={key} className="submission-item">
                  <p><strong>Match Number: </strong> {decodedValue.matchNumber} | ‎</p>
                  <p><strong>Team Number: </strong> {decodedValue.teamNumber} | ‎</p>
                  <p><strong>Submission Time: </strong> {new Date(decodedValue.submissionTime).toLocaleString()}‎ ‎</p>
                  <button onClick={() => openQrModal(value)} className="view-button">View QR</button>
                </div>
              );
            })}
          </div>
          <button onClick={closeHistoryModal} className="close-button">Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default QuizForm;
