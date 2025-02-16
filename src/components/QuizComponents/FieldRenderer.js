import React from 'react';
import TextField from './QuestionFields/TextField';
import TextLongField from './QuestionFields/TextLong';
import NumberField from './QuestionFields/NumberField';
import SelectField from './QuestionFields/SelectField';
import BooleanField from './QuestionFields/BooleanField';
import CounterField from './QuestionFields/CounterField';
import MultiCounterField from './QuestionFields/MultiCounterField';

const FieldRenderer = ({ field, onChange, value }) => {
  switch (field.type) {
    case 'text':
      return (
        <TextField
          key={field.code}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <NumberField
          key={field.code}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <SelectField
          key={field.code}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case 'boolean':
      return (
        <BooleanField
          key={field.code}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case 'counter':
      return (
        <CounterField
          key={field.code}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case 'multi-counter':
      return (
        <MultiCounterField
          key={field.code}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case 'text-long':
      return (
        <TextLongField
          key={field.code}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

export default FieldRenderer;
