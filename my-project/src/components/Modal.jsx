import styled from "styled-components";

const Bottom = styled.div`
  width: 700px;
  height: 70px;
  display: flex;
  flex-direction: row-reverse;

  .ic {
    border-style: none;
    background: none;
    outline: none;
    font-size: 1.4rem;
    margin-right: 1.2rem;
    cursor: pointer;
  }
`;

function Modal() {
  return (
    <Bottom>
      <button className="ic">🔍</button>
      <button className="ic">📚</button>
    </Bottom>
  );
};

export default Modal;