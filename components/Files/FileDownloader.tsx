import { Toast } from '@/components/Toast';
import style from './FileDownloader.module.scss';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { fileUploadAtom } from '@/states/data';
import { usePathname } from 'next/navigation';
import lodash from 'lodash';
import { confirmAtom } from '@/states/confirm';

const FileDownloader = ({ data, pageType, from }: any) => {
  const [fileList, setFileList] = useRecoilState(fileUploadAtom);
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const pathname = usePathname();
  const id = lodash.last(pathname.split('/'));
  const goDownload = async (objectName: string, fileName: string) => {
    const url = '/file/download';
    const data = {
      objectName: objectName,
      fileName: fileName,
    };
    const response = await apiBe
      .post(url, data, { responseType: 'blob' })
      .then((response: any) => {
        Toast('success', '파일을 다운로드합니다.', () => downloadBlob(response, fileName));
      })
      .catch((error) => {
        console.log(error);
        downloadBlob(error.data, fileName);
        Toast('error', '파일을 다운로드하는데 실패했습니다.');
      });
  };

  const downloadBlob = (blob: Blob, name: string) => {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
    // Remove link from body
    document.body.removeChild(link);
  };

  const delFile = async (id: any, fileId: any, objectName: any, from: any) => {
    console.log(id, fileId, objectName, from);
    let url: any = '';
    switch (from) {
      case 'notice':
        url = '/notice/file';
        break;
      case 'support':
        url = '/supportboard/board/file';
        break;
      default:
        break;
    }
    const response = await apiBe.delete(url, {
      data: { id: id, fileId: fileId, objectName: objectName },
    });
    if (response.status === 200) {
      const newFileList = fileList.filter((file: any) => file.id !== fileId);
      Toast('success', '파일을 삭제하였습니다', () => setFileList(newFileList));
    } else {
      Toast('error', '파일을 삭제하는데 실패했습니다.');
    }
  };

  const confirmDelFile = (id: any, fileId: any, objectName: any, from: any) => {
    setConfirm({
      ...confirm,
      open: true,
      title: '삭제',
      message: '삭제 하시겠습니까?',
      onConfirm: () => delFile(id, fileId, objectName, from),
    });
  };

  return (
    <>
      {data && data.length > 0 ? (
        <div className={style.downloader}>
          <div className={style.fileList}>
            <div className={style.label}>
              <label htmlFor="files">첨부파일</label>
            </div>
            <div className={style.files}>
              {data &&
                data.map((file: any, index: number) => {
                  return (
                    <div key={index} className={style.file}>
                      <p onClick={() => goDownload(file.objectName, file.originName)}>{file.originName}</p>
                      {pageType === 'view' ? (
                        <span className={style.downloadBtn} onClick={() => goDownload(file.objectName, file.originName)}>
                          다운로드
                        </span>
                      ) : (
                        <span className={style.delBtn} onClick={() => confirmDelFile(id, file.id, file.objectName, from)}>
                          삭제
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileDownloader;
