import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillEditorToolbar from './QuillEditorToolbar';
import { Box } from '@mui/material';

export default function QuillEditor({ value, onChange }) {
  const quillModules = {
    toolbar: {
      container: '#toolbar', // ID of the toolbar
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'indent',
    'align',
  ];

  return (
    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}>
      <QuillEditorToolbar />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={quillModules}
        formats={quillFormats}
        placeholder="Write your content here..."
        style={{
          height: '300px',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      />
    </Box>
  );
}
