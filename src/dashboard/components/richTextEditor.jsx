import React, { useState } from 'react'
import {
    BtnBold, BtnBulletList, BtnItalic,
    BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor,
    EditorProvider, Separator, Toolbar
} from 'react-simple-wysiwyg'

function RichTextEditor({onRichTextEditorChange}) {
    const [value, setValue] = useState();

    return (
        <div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar className='w-full'>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor
