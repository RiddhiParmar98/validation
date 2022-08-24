import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { forwardRef,useRef } from 'react';

const TextEditor = forwardRef(({value,handleEditiorChange},ref) => {
  const editorRef = useRef(null);
  return (
    <div className='editor'>
    <CKEditor
    ref={editorRef}
    editor={ ClassicEditor }
    data={value}
    onReady={(editor) => {
      if (ref?.current) {
        ref.current = editor;
      }
    }}
    onChange={handleEditiorChange }
    onBlur={ ( event, editor ) => {
        console.log( 'Blur.', editor );
    } }
    onFocus={ ( event, editor ) => {
        console.log( 'Focus.', editor );
    } }
/>

</div>
  )
});

export default TextEditor