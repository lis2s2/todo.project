import styled, { css } from "styled-components";

const Todoitems = styled.div`
  font-family: 'KyoboHandwriting2023wsa';
  height: 150px;
  min-width: 200px;
  max-width: 200px;
  border: 2px dashed black;
  border-radius: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  display: flex;
  align-self: center;
  justify-content: center;
  text-align: center;
  line-height: 1.5rem;
  margin: 10px;
  flex-wrap: wrap;
  /* flex-direction: column; */
  word-wrap: break-word;
  flex: 1;
  overflow: hidden;
  overflow-y:  auto;
  white-space: wrap; 
  padding: 0 1rem;
  

  .btnbox {
    height: 30px;
    text-align: center;
  }

  .timestamp {
    font-size: 0.8rem;
    color: gray;
    margin-top: 10px;
  }
`;

const TodoButtonitems = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  text-align: center;
`;

const StyledButton = styled.button`
  font-family: 'KyoboHandwriting2023wsa';
  /* background: skyblue; */
  background: white;
  color: black;
  width: 35px;
  height: 30px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  line-height: 15px;
  cursor: pointer;
  transition: 0.2s background ease-in;
  border-radius: 2rem;

`;

const StyledEditInput = styled.input`
  font-family: 'KyoboHandwriting2023wsa';
  background: none;
  outline: none;
  border-style: none;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: auto;
  flex: 1;
  text-align: center;
`;

{/* </Todoitem> */}
function TodoItem(props) {
  const { item: { id, contents, done, timestamp }, onRemove, onDone, edit, editValue, onEdit, onEditChange, onEditSave } = props;

  return (
    <div>
      <Todoitems>
        {edit === id ? (
          <>
            <StyledEditInput type="text" value={editValue} onChange={onEditChange} />
            <StyledButton onClick={() => onEditSave(id)}>✒️</StyledButton>
            <StyledButton onClick={() => onEditSave(!id)}>❌</StyledButton>
          </>
        ) : (
          <div>
            <p>{contents}</p>
            <p className="timestamp">{timestamp}</p>
          </div>
        )}
      </Todoitems>

      <TodoButtonitems>
        <StyledButton onClick={() => onEdit(id, contents)}>수정</StyledButton>
        <StyledButton onClick={() => onDone(id)}>{done ? '취소' : '완료'}</StyledButton>
        <StyledButton onClick={() => onRemove(id)}>🗑️</StyledButton>
      </TodoButtonitems>
    </div>
  );
};

export default TodoItem;