/* eslint-disable react/prop-types */
import styled from 'styled-components';

const InputWrap = styled.div`
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
  input {
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
    &:focus {
      background: #c0c0c0;
      border: 1px solid #a0a1a5;
    }
  }
`;

export const TextInput = ({ id, name, value, onChange }) => {
  return (
    <InputWrap>
      <label htmlFor={id}>{name}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputWrap>
  );
};

export default TextInput;
