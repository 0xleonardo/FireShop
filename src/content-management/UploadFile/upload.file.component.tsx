import {ChangeEvent} from 'react';
import "./style.css";

interface FileUploadSingleProps {
    handleFileChange:(e: ChangeEvent<HTMLInputElement>)=>void;
    handleUploadClick:()=>void;
    file?:File;
    imageUploaded:boolean;
    handleFileClear:()=>void;
    imageErrorMessage:string;
}

export const FileUploadSingle = (props:FileUploadSingleProps) => {
    return (
        <div className="file_upload">
           <div className="file_upload_input">
               <div className="file_upload_input_buttons">
                   <button onClick={props.handleUploadClick}><i className="pi pi-cloud-upload"/></button>
                   <button onClick={props.handleFileClear}><i className="pi pi-file-excel"/></button>
               </div>
               <input type="file" onChange={props.handleFileChange}/>
           </div>
            {props.imageUploaded && <div>Uploaded: {props.file && `${props.file.name} (${props.file.type})`}</div>}
            {props.imageErrorMessage && <div style={{color:"red"}}>{props.imageErrorMessage}</div>}
        </div>
    );
}

export default FileUploadSingle;