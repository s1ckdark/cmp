'use client';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";

export default function FormEditor({ initialValue, onChange }: { initialValue: string, onChange: (value: string) => void }) {
    const editorRef = useRef<Editor>(null);

    function handleChange() {
        const md = editorRef?.current
            ? editorRef?.current.getInstance().getMarkdown()
            : "";
        onChange(md);
    }

    return (
        <Editor
            height="600px"
            initialEditType="wysiwyg"
            initialValue={initialValue}
            onChange={handleChange}
            previewStyle="vertical"
            ref={editorRef}
            useCommandShortcut={true}
            placeholder="내용을 입력해주세요."
            toolbarItems={[
                // 툴바 옵션 설정
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock']
            ]}
        />
    );
}