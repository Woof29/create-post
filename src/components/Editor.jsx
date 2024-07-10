import React, { useState, useRef } from "react";
import EditorQuill from "./EditorQuill";
import styled from "styled-components";
import "quill/dist/quill.snow.css";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  min-height: 600px;
  padding: 12px;
  margin: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1a1a1a;
`;

export const MyEditor = () => {
  const quillRef = useRef();

  const handleChange = (content, delta, source, editor) => {
    // 使用 setTimeout 取得增加 style 樣式的 HTML
    // 我將編輯器的語法用 console 印出來，使用時只要處理這段 HtmlContent 即可
    setTimeout(() => {
      console.log("HtmlContent", editor.root.innerHTML);
    }, 20);
  };

  return (
    <Container>
      <EditorQuill ref={quillRef} onTextChange={handleChange} />
    </Container>
  );
};

export default MyEditor;
