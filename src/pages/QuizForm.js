import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';
import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import SelectField from '../components/SelectField';
import BooleanField from '../components/BooleanField';
import CounterField from '../components/CounterField';
import './QuizForm.css';

const quizData = {
  "$schema": "../schema.json",
  "title": "QRScout",
  "page_title": "Crescendo",
  "sections": [
    {
      "name": "Prematch",
      "preserveDataOnReset": true,
      "fields": [
        {
          "title": "Scouter Initials",
          "type": "text",
          "required": true,
          "code": "scouter"
        },
        {
          "title": "Match Number",
          "type": "number",
          "required": true,
          "code": "matchNumber",
          "preserveDataOnReset": true,
          "autoIncrementOnReset": true
        },
        {
          "title": "Robot",
          "type": "select",
          "required": true,
          "code": "robot",
          "choices": {
            "R1": "Red 1",
            "R2": "Red 2",
            "R3": "Red 3",
            "B1": "Blue 1",
            "B2": "Blue 2",
            "B3": "Blue 3"
          },
          "defaultValue": "R1"
        },
        {
          "title": "Team Number",
          "type": "number",
          "required": true,
          "code": "teamNumber"
        },
        {
          "title": "Starting Position",
          "type": "select",
          "required": true,
          "code": "Prsp",
          "choices": {
            "Source": "Source",
            "Middle": "Middle",
            "Amp": "Amp"
          },
          "defaultValue": "Source"
        },
        {
          "title": "No Show",
          "type": "boolean",
          "defaultValue": false,
          "required": false,
          "code": "noShow"
        }
      ]
    },
    {
      "name": "Autonomous",
      "fields": [
        {
          "title": "Moved?",
          "type": "boolean",
          "defaultValue": false,
          "required": false,
          "code": "Mved"
        },
        {
          "code": "ausc",
          "title": "Speaker Scored",
          "type": "counter",
          "defaultValue": 0,
          "min": 0,
          "required": false
        },
        {
          "code": "auskpm",
          "title": "Speaker Missed",
          "type": "counter",
          "defaultValue": 0,
          "min": 0,
          "required": false
        },
        {
          "code": "a_gp_Path",
          "title": "Auto Game Piece Path",
          "type": "select",
          "multiSelect": true,
          "choices": {
            "1": "Speaker 3 (Source Side)",
            "2": "Speaker 2 (Middle)",
            "3": "Speaker 1 (Amp Side)",
            "4": "Midline 5 (Source Edge)",
            "5": "Midline 4",
            "6": "Midline 3 (Middle)",
            "7": "Midline 2",
            "8": "Midline 1 (Amp Edge)"
          },
          "defaultValue": 1
        },
        {
          "code": "auf",
          "title": "Auto Foul",
          "type": "counter",
          "defaultValue": 0,
          "min": 0,
          "required": false
        }
      ]
    },
    {
      "name": "Teleop",
      "fields": [
        {
          "code": "tamps",
          "title": "Amp Scored",
          "type": "counter",
          "defaultValue": 0,
          "min": 0,
          "required": false
        },
        {
          "code": "tsc",
          "title": "Speaker Scored",
          "type": "counter",
          "defaultValue": 0,
          "min": 0,
          "required": false
        },
        {
          "code": "tfs",
          "title": "Feeder Shots",
          "type": "counter",
          "defaultValue": 0,
          "min": 0,
          "required": false
        },
        {
          "code": "cn",
          "title": "Note in Trap?",
          "type": "counter",
          "defaultValue": 0,
          "min": 0,
          "required": false
        },
        {
          "code": "Fou/Tech",
          "title": "Teleop Foul",
          "type": "counter",
          "defaultValue": 0,
          "required": false
        }
      ]
    },
    {
      "name": "Endgame",
      "fields": [
        {
          "title": "End Position",
          "type": "select",
          "required": true,
          "code": "epo",
          "choices": {
            "No": "No Climb",
            "P": "Parked",
            "Os": "Onstage",
            "Hm": "Harmony",
            "Fh": "Failed Harmony"
          },
          "defaultValue": "No"
        }
      ]
    },
    {
      "name": "Postmatch",
      "fields": [
        {
          "code": "or",
          "title": "Offense Skill",
          "type": "select",
          "choices": {
            "1": "Not Effective",
            "2": "Average",
            "3": "Very Effective",
            "x": "Not Observed"
          },
          "defaultValue": "x",
          "required": false
        },
        {
          "code": "dr",
          "title": "Defense Skill",
          "type": "select",
          "choices": {
            "1": "Not Effective",
            "2": "Average",
            "3": "Very Effective",
            "x": "Not Observed"
          },
          "defaultValue": "x",
          "required": false
        },
        {
          "code": "dto",
          "title": "Died/Tipped Over",
          "type": "boolean",
          "defaultValue": false,
          "required": false
        },
        {
          "code": "yc",
          "title": "Yellow/Red Card",
          "type": "select",
          "defaultValue": "No Card",
          "required": true,
          "choices": {
            "No Card": "No Card",
            "Yellow": "Yellow Card",
            "Red": "Red Card"
          }
        },
        {
          "code": "co",
          "title": "Comments",
          "type": "text",
          "min": 0,
          "max": 50,
          "required": false,
          "defaultValue": " "
        }
      ]
    }
  ]
};

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
    return LZUTF8.decompress(content, {inputEncoding: 'Base64', outputEncoding: 'String'});
  };

  const compressAndEncode = (content) => {
    return LZUTF8.compress(content, {outputEncoding: 'Base64'});
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
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100vw"}}>
        <h1 style={{color: "white"}}>{quizData.page_title}</h1>
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
          <QRCode value={tempQrContent || qrContent} />
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
