import styled from 'styled-components';
const InputWrapper = styled.div`
  input[type='file'] {
    width: 100%;
    color: var(--grey-500);
  }

  input[type='file']::file-selector-button {
    width: 136px;
    color: white;
    box-shadow: var(--shadow-2);
    border-radius: 4px;
    padding: 0 16px;
    height: 35px;
    cursor: pointer;
    background-color: var(--primary-500);
    border: 1px solid var(--primary-500);
    margin-right: 16px;
    transition: background-color 200ms;
  }
  /* file upload button hover state */
  input[type='file']::file-selector-button:hover {
    background-color: var(--primary-700);
  }

  /* file upload button active state */
  input[type='file']::file-selector-button:active {
    background-color: #e5e7eb;
  }
`;
export default InputWrapper;
