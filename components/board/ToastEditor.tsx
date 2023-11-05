'use client';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect } from "react";
import axios from "axios";

interface EditorProps {
    content: string;
    editorRef: React.MutableRefObject<any>;
}

interface header {
    header: string;
}
const ToastEditor: React.FC<EditorProps> = ({ content, editorRef }) => {
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync']
    ];

    // useEffect(() => {
    //     if (editorRef.current) {
    //         editorRef.current.getInstance().removeHook("addImageBlobHook");
    //         editorRef.current
    //         .getInstance()
    //         .addHook("addImageBlobHook", (blob:any, callback:any) => {
    //             (async () => {
    //             let formData = new FormData();
    //             formData.append("file", blob);

    //             axios.defaults.withCredentials = true;
    //             const { data: url } = await axios.post(
    //                 `${backUrl}image.do`,
    //                 formData,
    //                 {
    //                 headers: { "content-type": "multipart/formdata" },
    //                 }
    //             );
    //             callback(url, "alt text");
    //             })();

    //             return false;
    //         });
    //     }
    //     return () => {};
    // }, [editorRef]);

    return (
        <>
            {editorRef && (
                <Editor
                    height="600px"
                    initialEditType="wysiwyg"
                    initialValue={content || ' '}
                    previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
                    ref={editorRef}
                    theme={''}
                    usageStatistics={false}
                    toolbarItems={toolbarItems}
                    useCommandShortcut={true}
                    placeholder="내용을 입력해주세요."
                />
            )}
        </>
    );
}
export default ToastEditor;
