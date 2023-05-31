
import _ from 'lodash';
import { readAndCompressImage } from 'browser-image-resizer';

const Images = {
  compress: async (file) => {
    const config = {
      quality: 0.7,
      maxWidth: 1280,
      maxHeight: 1280,
      autoRotate: false,
    };
    const blob = await readAndCompressImage(file, config);
    return new File([blob], 'compressed', {
      type: blob.type,
    });
  },
};

const Files = {
  getFile: (record) => {
    if (record instanceof File) return record;
    if (record.file instanceof File) return record.file;
    if (record.originFileObj instanceof File) return record.originFileObj;
    return null;
  },
  getName: (file, options) => {
    const { ref, name } = options;
    return [
      ref,
      ref && '###',
      name || file.name,
    ].filter(Boolean).join('');
  },
  prepare: async (record, options = {}) => {
    if (!record) return;
    const rawFile = Files.getFile(record);
    const name = Files.getName(rawFile, options);
    const type = rawFile.type || '';
    let file = rawFile;
    if (type.includes('image/')) {
      file = await Images.compress(file);
    }
    return new File([file], name, { type: file.type });
  },
  download: ({ name, data, extension }) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}.${extension}`);
    document.body.appendChild(link);
    link.click();
  },
};

window.files = Files;

export default Files;
