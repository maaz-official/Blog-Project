import React from 'react';
import { Box } from '@mui/material';

const FONT_FAMILY = ['Arial', 'Tahoma', 'Georgia', 'Impact', 'Verdana'];
const FONT_SIZE = ['8px', '12px', '16px', '24px', '32px'];
const HEADINGS = ['Heading 1', 'Heading 2', 'Heading 3'];

export default function QuillEditorToolbar() {
  return (
    <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: 2, pb: 1 }}>
      <div id="toolbar">
        <select className="ql-font">
          {FONT_FAMILY.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        <select className="ql-size">
          {FONT_SIZE.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <select className="ql-header">
          {HEADINGS.map((heading, index) => (
            <option key={index} value={index + 1}>
              {heading}
            </option>
          ))}
        </select>

        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />

        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />

        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
      </div>
    </Box>
  );
}
