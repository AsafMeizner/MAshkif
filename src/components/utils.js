const LZUTF8 = require('lzutf8');

export const decompressAndDecode = (content) => {
  return LZUTF8.decompress(content, { inputEncoding: 'Base64', outputEncoding: 'String' });
};

export const compressAndEncode = (content) => {
  return LZUTF8.compress(content, { outputEncoding: 'Base64' });
};
