import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

interface ViewProps {
    content: string;
}

const ToastViewer: React.FC<ViewProps> = ({ content }) => {
    return (
        <Viewer
            initialValue={content || ''}
        />
    );
}

export default ToastViewer;
