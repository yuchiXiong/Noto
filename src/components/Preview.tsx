import React, { ReactElement, useRef } from 'react'
import { convertFileSrc } from "@tauri-apps/api/tauri";
import NotoEditor, { TEditorFile } from "@/components/NotoEditor";

interface IDirectoryProps {
  file: TEditorFile
}

const Preview = (props: IDirectoryProps) => {
  const { file } = props;

  const [_, forceUpdate] = React.useState(0);
  const viewRef = useRef<ReactElement | null>(null);

  const suffix = file.path.split('.').pop();

  const src = convertFileSrc(file.path);

  if (viewRef.current) return viewRef.current;

  switch (suffix) {
    case 'jpg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'jpeg':
      viewRef.current = (<div className='h-full w-full flex justify-center items-center p-8 box-border overflow-auto'>
        <img className='max-h-full shadow-2xl' src={src} alt={file.name}/>
      </div>);
      break;
    case 'md':
      viewRef.current = (<NotoEditor filePath={file.path}/>)
      break;
    default:
      viewRef.current = (<div>暂不支持该文件预览</div>);
  }

  return viewRef.current;
}

export default Preview;