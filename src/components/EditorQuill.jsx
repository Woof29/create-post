/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgDB } from "../utils/firebaseInit";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import styled from "styled-components";
Quill.register("modules/imageResize", ImageResize);

const QlEditor = styled.div`
  .ql-container {
    min-height: 300px;
  }
`;

const EditorQuill = forwardRef(
  (
    { readOnly, type, initialContent, onTextChange, onSelectionChange },
    quillRef
  ) => {
    const containerRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );

      const toolbarOptions = {
        container: [
          ["bold", "italic", "underline", "strike", { align: [] }],
          [{ header: [1, 2, 3] }],
          [{ size: ["small", false, "large", "huge"] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ color: [] }, { background: [] }],
          // 新增了一個 uploadImage 的功能
          ["link", { image: true }, "video"],
          ["clean"],
        ],
        handlers: {
          image: function () {
            let fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("accept", "image/*");
            fileInput.click();

            fileInput.addEventListener("change", () => {
              const file = fileInput.files[0];
              const reader = new FileReader();
              reader.onloadend = async () => {
                try {
                  // 上傳圖片的 API Demo
                  const storageRef = ref(imgDB, `${type}/${file.name}`);
                  const res = await uploadBytes(storageRef, file);

                  // imageUrl 是上傳後取得的圖片網址
                  const imageUrl = await getDownloadURL(res.ref);

                  let range = this.quill.getSelection();
                  quill.insertEmbed(range.index, "image", imageUrl);
                  // 取得剛插入的圖片並設置樣式 max-width = 100%
                  setTimeout(() => {
                    let img = this.quill.root.querySelector(
                      `img[src="${imageUrl}"]`
                    );
                    if (img) {
                      img.style.maxWidth = "100%";
                    }
                  }, 10);
                } catch (error) {
                  console.error("Response error:", error);
                }
              };
              reader.readAsArrayBuffer(file);
            });
          },
        },
      };

      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder: "請輸入內容...",
        modules: {
          toolbar: toolbarOptions,
          imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
      });

      quillRef.current = quill;

      if (initialContent) {
        quill.root.innerHTML = initialContent;
      }

      quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
        onTextChangeRef.current?.(quill.root.innerHTML, delta, source, quill);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        quillRef.current = null;
        container.innerHTML = "";
      };
    }, [quillRef, type]);

    useEffect(() => {
      quillRef.current?.enable(!readOnly);
    }, [quillRef, readOnly]);

    return <QlEditor ref={containerRef}></QlEditor>;
  }
);

EditorQuill.displayName = "EditorQuill";

export default EditorQuill;
