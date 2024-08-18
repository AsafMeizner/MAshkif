const LZUTF8 = require('lzutf8');

export const initializeResponses = (sections) => {
  const initialResponses = {};
  sections.forEach(section => {
    section.fields.forEach(field => {
      initialResponses[field.code] = field.defaultValue !== undefined ? field.defaultValue : '';
    });
  });
  return initialResponses;
};

export const decompressAndDecode = (content) => {
  return LZUTF8.decompress(content, { inputEncoding: 'Base64', outputEncoding: 'String' });
};

export const compressAndEncode = (content) => {
  return LZUTF8.compress(content, { outputEncoding: 'Base64' });
};
