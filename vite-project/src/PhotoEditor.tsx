import { UIEvent, PhotoEditorSDKUI } from "photoeditorsdk";
import React from "react";

interface PhotoEditorSDKProps {
  image: string;
  onClose: () => void; // optional callback when closing the editor
}

export class PhotoEditorSDK extends React.Component<PhotoEditorSDKProps> {

  componentDidMount() {
    this.initEditor();
  }
  async initEditor() {
    console.log("Loading image:", this.props.image);
    const editor = await PhotoEditorSDKUI.init({
      container: "#editor",
      image: this.props.image, // Image url or Image path relative to assets folder
      // Please replace this with your license: https://img.ly/dashboard
      license: '',
    });
    console.log("PhotoEditorSDK for Web is ready!");
    editor.on(UIEvent.EXPORT, (imageSrc) => {
      console.log("Exported ", imageSrc);
    });
  }

  render() {
    return (
      <div
        id="editor"
        style={{width: "100vw", height: "100vh" }}
      />
    );
  }
}
