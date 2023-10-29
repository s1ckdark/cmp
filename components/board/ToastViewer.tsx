import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const ToastViewer = ({ content }: { content: any }) => {
    return (
        <Viewer
            initialValue={content}
        />
    );
}

export default ToastViewer;
