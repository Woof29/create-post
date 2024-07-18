/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import EditorQuill from './EditorQuill';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import { imgDB } from '../utils/firebaseInit';
import styled from 'styled-components';
import TextInput from './TextInput';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

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
`;

const Form = styled.form`
  width: 100%;
  max-width: 739px;
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
      content: '';
      width: calc(100% - 40px);
      height: 2px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &::before {
      content: '';
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
      cursor: pointer;
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

const InfoWrap = styled.div`
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
  textarea,
  select {
    width: 100%;
    padding: 0;
    color: #444;
    cursor: pointer;
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
  textarea {
    height: 120px;
    resize: none;
  }
`;

const Toolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  button {
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
  }
  .publish {
    background-color: #af4c4c;
    &:hover {
      background-color: #a04545;
    }
  }
`;

export const MyEditor = () => {
  const quillRef = useRef();
  const inputFile = useRef(null);
  const [content, setContent] = useState(() => {
    return localStorage.getItem('draftContent') || '';
  });
  const [coverUrl, setCoverUrl] = useState(() => {
    return localStorage.getItem('coverUrl') || '';
  });
  const [type, setType] = useState(() => {
    return localStorage.getItem('type') || '';
  });
  const [topic, setTopic] = useState(() => {
    return localStorage.getItem('topic') || '';
  });
  const [title, setTitle] = useState(() => {
    return localStorage.getItem('title') || '';
  });
  const [link, setLink] = useState(() => {
    return localStorage.getItem('link') || '';
  });
  const [preview, setPreview] = useState(() => {
    return localStorage.getItem('preview') || '';
  });

  const handleUploadCover = (e) => {
    if (type) {
      const file = e.target.files[0];
      console.log(inputFile.current.value);
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // 上傳圖片的 API Demo
          const storageRef = ref(imgDB, `${type}/${file.name}`);
          const res = await uploadBytes(storageRef, file);

          // imageUrl 是上傳後取得的圖片網址
          const imageUrl = await getDownloadURL(res.ref);
          setCoverUrl(imageUrl);
        } catch (error) {
          console.error('Response error:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('plz enter type before upload cover!');
      inputFile.current.value = '';
      return;
    }
  };

  const handleChange = (newContent) => {
    setContent(newContent);
  };

  const handleSaveDraft = () => {
    // 將當前內容保存到 localStorage
    localStorage.setItem('coverUrl', coverUrl);
    localStorage.setItem('draftContent', content);
    localStorage.setItem('type', type);
    localStorage.setItem('topic', topic);
    localStorage.setItem('title', title);
    localStorage.setItem('link', link);
    localStorage.setItem('preview', preview);
    alert('草稿已保存！');
  };

  const handlePublish = async () => {
    try {
      const docRef = await addDoc(collection(db, type), {
        coverUrl: coverUrl,
        draftContent: content,
        topic: topic,
        title: title,
        link: link,
        preview: preview,
        createdAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      alert('文件已成功上傳！');
      reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('上傳文件時發生錯誤：' + error.message);
    }
  };

  const reset = () => {
    setContent('');
    setCoverUrl('');
    setType('');
    setTopic('');
    setTitle('');
    setLink('');
    setPreview('');
    localStorage.removeItem('coverUrl');
    localStorage.removeItem('draftContent');
    localStorage.removeItem('type');
    localStorage.removeItem('topic');
    localStorage.removeItem('title');
    localStorage.removeItem('link');
    localStorage.removeItem('preview');
  };
  return (
    <Container>
      <Form>
        <UploadCover>
          <div className="uploadBtn">
            <input
              ref={inputFile}
              accept="image/*"
              type="file"
              onChange={handleUploadCover}
              name="cover"
            />
          </div>
          <div className="cover">{!!coverUrl && <img src={coverUrl} />}</div>
        </UploadCover>

        <InfoWrap>
          <label htmlFor="type">分類</label>
          <select
            name="type"
            id="type"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              --請選擇分類--
            </option>
            <option value="portfolio">portfolio</option>
            <option value="blog">blog</option>
          </select>
        </InfoWrap>

        <InfoWrap>
          <label htmlFor="topic">主題</label>
          <select
            name="topic"
            id="topic"
            defaultValue={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="" disabled>
              --請選擇主題--
            </option>
            {type && <option value="photo">photo</option>}

            {type === 'portfolio' && (
              <>
                <option value="video">video</option>
                <option value="web">web</option>
                <option value="graphic">graphic</option>
              </>
            )}
            {type === 'blog' && (
              <>
                <option value="tech">tech</option>
                <option value="travel">travel</option>
                <option value="note">note</option>
              </>
            )}
          </select>
        </InfoWrap>

        <TextInput
          id="title"
          name="標題"
          value={title}
          onChange={setTitle}
        ></TextInput>
        <TextInput
          id="link"
          name="連結"
          value={link}
          onChange={setLink}
        ></TextInput>

        <InfoWrap>
          <label htmlFor="preview">預覽</label>
          <textarea
            id="preview"
            placeholder="請輸入預覽文字..."
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
          />
        </InfoWrap>
      </Form>

      <EditorQuill
        ref={quillRef}
        onTextChange={handleChange}
        initialContent={content}
        type={type}
      />

      <Toolbar>
        <button onClick={handleSaveDraft}>保存草稿</button>
        <button className="publish" type="submit" onClick={handlePublish}>
          上傳文件
        </button>
      </Toolbar>
    </Container>
  );
};

export default MyEditor;
