import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ModalComponent from '../components/QuizComponents/ModalComponent';
import HistoryModal from '../components/QuizComponents/HistoryModal';
import FieldRenderer from '../components/QuizComponents/FieldRenderer';
import HapticFeedback from '../components/HapticFeedback';
import { compressAndEncode } from '../components/utils';
import './QuizForm.css';

const defaultQuizData = require('../quizData.json');

const QuizForm = () => {
  const [sections, setSections] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [historyModalIsOpen, setHistoryModalIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [tempQrContent, setTempQrContent] = useState(null);
  const [qrContent, setQrContent] = useState('');
  const [pageTitle, setPageTitle] = useState(defaultQuizData.page_title);
  const [resetFeedback, setResetFeedback] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { handleSubmit, reset, control } = useForm();

  useEffect(() => {
    const savedConfig = localStorage.getItem('config');
    const quizData = savedConfig ? JSON.parse(savedConfig) : defaultQuizData;
    
    setSections(quizData.sections);
    setPageTitle(quizData.page_title || defaultQuizData.page_title);
    
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);
  }, []);

  const onSubmit = (data) => {
    let content = JSON.stringify({
      ...data,
      submissionTime: new Date().getTime()
    });
    content = compressAndEncode(content);
    setQrContent(content);

    const newSubmissions = [...submissions, content];
    setSubmissions(newSubmissions);
    localStorage.setItem('submissions', JSON.stringify(newSubmissions));

    setModalIsOpen(true);
    setFormSubmitted(true); 
  };

  useEffect(() => {
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  const handleDelete = (index) => {
    const updatedSubmissions = submissions.filter((_, i) => i !== index);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const handleDeleteAll = () => {
    setSubmissions([]);
    localStorage.setItem('submissions', JSON.stringify([]));
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

  const handleReset = () => {
    reset();
    setResetFeedback(true); 
    setTimeout(() => setResetFeedback(false), 2000); 
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw" }}>
        <h1 style={{ color: "#e74c3c" }}>{pageTitle}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        {sections.map((section) => (
          <div key={section.name} className="quiz-container">
            <h2 className="section-title">{section.name}</h2>
            <div className="section-content">
              {section.fields.map((field) => (
                <div key={field.code} className="field-section">
                  <Controller
                    name={field.code}
                    control={control}
                    defaultValue={field.defaultValue || ''}
                    render={({ field: controllerField }) => (
                      <FieldRenderer field={field} onChange={controllerField.onChange} value={controllerField.value} />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="reset-button" onClick={handleReset}>Reset Form</button>
          <button type="button" className="history-button" onClick={openHistoryModal}>View Submissions</button>
        </div>
      </form>
      {formSubmitted && <HapticFeedback />}
      {resetFeedback && <div className="reset-feedback">Form reset successfully!</div>}
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
        handleDelete={handleDelete} 
        handleDeleteAll={handleDeleteAll} 
      />
    </div>
  );
};

export default QuizForm;
