
import { UIEvent, PhotoEditorSDKUI, Tool } from "photoeditorsdk";
import React from "react";

interface PhotoEditorSDKProps {
  image: string;
  onClose: () => void; // optional callback when closing the editor
  onExport: (editedImage: string) => void; 
}

export class PhotoEditorSDK extends React.Component<PhotoEditorSDKProps> {

  componentDidMount() {
    this.initEditor();
  }
  async initEditor() {
    console.log("Loading image:", this.props.image);
    const editor = await PhotoEditorSDKUI.init({
      container: "#editor",
      image: this.props.image, 
      license: '',
      layout: 'basic',
      enableZoom: true,
      tools: [
        Tool.FILTER,
        Tool.ADJUSTMENT,
        Tool.TRANSFORM
      ],
      scaleImageToFit: true,
    
    });
    console.log("PhotoEditorSDK for Web is ready!");

    editor.on(UIEvent.EXPORT, (imageSrc) => {
      console.log("Exported ", imageSrc);
      this.props.onExport(imageSrc);
    });

    editor.on(UIEvent.CLOSE, () => {
      if (this.props.onClose) {
        this.props.onClose(); 
      }
      console.log("Editor Closed ");
    });
  }

  render() {
    return (
      <div
        id="editor"
      />
    );
  }
}
