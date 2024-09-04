import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoBoardWrapper = styled.div`
  width: 700px;
  height: 540px;
  margin: 0 auto;
  border-radius: 4px;
  background: white;
  border-radius: 2rem;
  box-sizing: border-box;

  .board-title {
  color: #000000;
  height: 1.5rem;
  font-size: 1.4rem;
  padding: 1.5rem 0.5rem 0.5rem 2rem;
  overflow: auto; 
}

.content {
  overflow-y: auto;
  margin: 0 1rem;
  display: flex;
  flex-direction: row;
  }
`;


function TodoBoard(props) {
  const { todo, onRemove, onDone, edit, editValue, onEdit, onEditChange, onEditSave } = props;
  const list = todo.filter(d => !d.done);
  const done = todo.filter(d => d.done);

  return (
    <TodoBoardWrapper>
      <h1 className="board-title">🌟List</h1>
      <div className="content">
        {list.map(item => <TodoItem 
                            key={item.id} 
                            item={item} 
                            onDone={onDone} 
                            onRemove={onRemove} 
                            edit={edit}
                            editValue={editValue}
                            onEdit={onEdit}
                            onEditChange={onEditChange}
                            onEditSave={onEditSave} 
                          />)}
      </div>

      <h1 className="board-title">🌈Done</h1>
      <div className="content">
        {done.map(item => <TodoItem 
                            key={item.id} 
                            item={item} 
                            onDone={onDone} 
                            onRemove={onRemove}
                            edit={edit}
                            editValue={editValue}
                            onEdit={onEdit}
                            onEditChange={onEditChange}
                            onEditSave={onEditSave} 
                          />)}
      </div>
    
    </TodoBoardWrapper>
  );
};

export default TodoBoard;