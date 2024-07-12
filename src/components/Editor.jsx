import React, { useState, useRef, useEffect } from "react";
import EditorQuill from "./EditorQuill";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgDB } from "../utils/firebaseInit";
import styled from "styled-components";
import TextInput from "./TextInput";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 12px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  color: #1a1a1a;
  img {
    width: 300px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 739px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1a1a1a;
  gap: 16px;
`;

const UploadCover = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .uploadBtn {
    width: 56px;
    height: 56px;
    padding: 16px;
    background: #2e2e2e;
    border-radius: 8px;
    position: relative;
    &::after,
    ::before {
      content: "";
      width: calc(100% - 40px);
      height: 2px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &::before {
      content: "";
      width: calc(100% - 40px);
      height: 2px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
    }

    input {
      width: 100%;
      height: 100%;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      opacity: 0;
    }
  }
  .cover {
    width: 200px;
    padding-bottom: 16%;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      animation: fadeIn 1s forwards;
    }
  }
`;

const SelectorWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  label {
    font-size: 14px;
    font-weight: bold;
    color: #444;
    flex-shrink: 0;
  }
  select {
    width: 100%;
    padding: 0;
    color: #444;
    &::placeholder {
      color: #444;
      font-size: 14px;
      line-height: 20px;
    }
    border: 1px solid #444;
    background: #fff;
    border-radius: 8px;
    padding: 12px;
  }
`;

const SaveButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export const MyEditor = () => {
  const quillRef = useRef();
  const [content, setContent] = useState(() => {
    return localStorage.getItem("draftContent") || "";
  });
  const [coverUrl, setCoverUrl] = useState(() => {
    return localStorage.getItem("coverUrl") || "";
  });

  const handleUploadCover = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        // 上傳圖片的 API Demo
        const storageRef = ref(imgDB, `portfolio/${file.name}`);
        const res = await uploadBytes(storageRef, file);

        // imageUrl 是上傳後取得的圖片網址
        const imageUrl = await getDownloadURL(res.ref);
        setCoverUrl(imageUrl);
      } catch (error) {
        console.error("Response error:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleChange = (newContent) => {
    setContent(newContent);
  };

  const handleSaveDraft = () => {
    // 將當前內容保存到 localStorage
    localStorage.setItem("coverUrl", coverUrl);
    localStorage.setItem("draftContent", content);
    alert("草稿已保存！");
  };

  return (
    <Container>
      <Form>
        <SelectorWrap>
          <label htmlFor="topic">分類</label>
          <select name="type" id="">
            <option value="portfolio">portfolio</option>
            <option value="blog">blog</option>
          </select>
        </SelectorWrap>

        <UploadCover>
          <div className="uploadBtn">
            <input accept="image/*" type="file" onChange={handleUploadCover} />
          </div>
          <div className="cover">{!!coverUrl && <img src={coverUrl} />}</div>
        </UploadCover>

        <TextInput id="title" name="標題"></TextInput>
        <TextInput id="link" name="連結"></TextInput>

        <SelectorWrap>
          <label htmlFor="topic">主題</label>
          <select name="topic" id="topic">
            <option value="video">video</option>
            <option value="photo">photo</option>
            <option value="web">web</option>
            <option value="graphic">graphic</option>
            <option value="tech">tech</option>
            <option value="travel">travel</option>
            <option value="note">note</option>
          </select>
        </SelectorWrap>
      </Form>

      <EditorQuill
        ref={quillRef}
        onTextChange={handleChange}
        initialContent={content}
      />
      <SaveButton onClick={handleSaveDraft}>保存草稿</SaveButton>
    </Container>
  );
};

export default MyEditor;
