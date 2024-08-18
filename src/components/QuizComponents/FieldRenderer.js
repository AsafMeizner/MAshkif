import React from 'react';
import TextField from './QuestionFields/TextField';
import NumberField from './QuestionFields/NumberField';
import SelectField from './QuestionFields/SelectField';
import BooleanField from './QuestionFields/BooleanField';
import CounterField from './QuestionFields/CounterField';

const FieldRenderer = ({ field, onChange }) => {
  switch (field.type) {
    case 'text':
      return (
        <TextField
          key={field.code}
          field={field}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <NumberField
          key={field.code}
          field={field}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <SelectField
          key={field.code}
          field={field}
          onChange={onChange}
        />
      );
    case 'boolean':
      return (
        <BooleanField
          key={field.code}
          field={field}
          onChange={onChange}
        />
      );
    case 'counter':
      return (
        <CounterField
          key={field.code}
          field={field}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

export default FieldRenderer;
