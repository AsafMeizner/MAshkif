import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ModalComponent from '../components/QuizComponents/ModalComponent';
import HistoryModal from '../components/QuizComponents/HistoryModal';
import FieldRenderer from '../components/QuizComponents/FieldRenderer';
import HapticFeedback from '../components/HapticFeedback';
import { toast } from 'react-toastify';
import { compressAndEncode, validateAutocompleteFields } from '../components/utils';
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
    const quizData = defaultQuizData;
    setSections(quizData.sections);
    setPageTitle(quizData.page_title || defaultQuizData.page_title);
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);
  }, []);

  const onSubmit = (data) => {
    // Validate autocomplete fields based on preferences
    const validation = validateAutocompleteFields(sections, data);
    if (!validation.isValid) {
      // Show error toast with all validation errors
      validation.errors.forEach(error => {
        toast.error(error);
      });
      return;
    }

    const reducedData = sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        if (field.type === 'multi-counter') {
          const multiValue = data[field.code] || {}; // Get the object for the multi-counter field
          // Spread subfields into the main structure with their individual codes
          field.subFields.forEach((subField) => {
            acc[subField.code] =
              multiValue[subField.code] !== undefined && multiValue[subField.code] !== ''
                ? multiValue[subField.code]
                : subField.defaultValue !== undefined
                  ? subField.defaultValue
                  : 0; // Default to 0 if no defaultValue is provided
          });
        } else if (field.type === 'number') {
          // Convert number field values from string to number
          acc[field.code] =
            data[field.code] !== undefined && data[field.code] !== ''
              ? Number(data[field.code])
              : field.defaultValue !== undefined
                ? field.defaultValue
                : 0;
        } else {
          acc[field.code] =
            data[field.code] !== undefined && data[field.code] !== ''
              ? data[field.code]
              : field.defaultValue !== undefined
                ? field.defaultValue
                : field.type === 'number'
                  ? 0
                  : field.type === 'boolean'
                    ? false
                    : '';
        }
      });
      return acc;
    }, {});

    const sanitizedData = {
      form: ':default:',
      ...reducedData,
      submissionTime: new Date().getTime(),
    };

    let content = compressAndEncode(JSON.stringify(sanitizedData));
    setQrContent(content);

    const newSubmissions = [...submissions, content];
    setSubmissions(newSubmissions);
    localStorage.setItem('submissions', JSON.stringify(newSubmissions));
    toast.success('Form submitted successfully!');

    setModalIsOpen(true);
    setFormSubmitted(true);
  };

  const handleDelete = (index) => {
    const updatedSubmissions = submissions.filter((_, i) => i !== index);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    toast.success('Submission deleted successfully!');
  };

  const handleDeleteAll = () => {
    setSubmissions([]);
    localStorage.setItem('submissions', JSON.stringify([]));
    toast.success('All submissions deleted successfully!');
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
    <div
      style={
        window.innerWidth > window.innerHeight
          ? { marginTop: '5%', marginBottom: '5%' }
          : { marginTop: '10%', marginBottom: '5%' }
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          margintop: '10%',
        }}
      >
        <h1 className="quiz-title">{pageTitle}</h1>
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
                    defaultValue={
                      field.type === 'number'
                        ? 0
                        : field.type === 'multi-counter'
                        ? field.subFields.reduce((acc, subField) => {
                            acc[subField.code] = subField.defaultValue || 0;
                            return acc;
                          }, {})
                        : field.defaultValue || ''
                    }
                    render={({ field: controllerField }) => (
                      <FieldRenderer
                        field={field}
                        onChange={controllerField.onChange}
                        value={controllerField.value}
                        valueAsNumber={field.type === 'number'}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset Form
          </button>
          <button type="button" className="history-button" onClick={openHistoryModal}>
            View Submissions
          </button>
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
