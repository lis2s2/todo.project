import logo from './logo.svg';
import './App.css';
import { useRef, useState, useEffect } from 'react';
import { reset } from 'styled-reset'
import styled from "styled-components";
import TodoBoard from './components/TodoBoard';
import { createGlobalStyle } from 'styled-components'
import { v4 as uuidv4 } from "uuid";
import Modal from './components/Modal';

const GlobalStyle = createGlobalStyle`
  // 스타일 리셋
  ${reset}

  body {
    font-family: 'PyeongChangPeace-Bold';
    font-size: 1.3rem;
    background: #e9ecef;
    width: 700px;
    margin: 4.5rem auto;
    overflow: hidden;
    box-sizing: border-box;
  }

  .clock {
  font-family: 'KyoboHandwriting2023wsa';
  display: flex;
  justify-content: end;
  margin: 0 3rem 1rem 0;
  }

  .app-title {
    font-family: 'PyeongChangPeace-Bold';
    background: skyblue;
    color: white;
    height: 4rem;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    }
`;

const TodoInputWrapper = styled.form`
  display: flex;
  background: lightyellow;
  border-radius: 2rem;
  height: 64px;
`;

const StyledInput = styled.input`
  font-family: 'KyoboHandwriting2023wsa';
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  margin-left: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.5;
  color: #000000;
  flex: 1;
  display: flex;
  
  &::placeholder {
    color: #000000;
  }
`;

const StyledButton = styled.button`
  font-family: 'KyoboHandwriting2023wsa';
  background: skyblue;
  color: black;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s background ease-in;
  border-radius: 2rem;

  &:hover {
    background: lightblue;
  }
`;


function App() {
  
  /* 기본 투두 */
  const [todo, setTodo] = useState([
    {
      id: uuidv4(),
      contents: '리액트기초를 공부해봅시다.',
      done : false,
      timestamp: new Date().toLocaleDateString()
    },
    {
      id: uuidv4() + 1,
      contents: '리액트기초를 공부해봅시다222.',
      done : false,
      timestamp: new Date().toLocaleDateString()
    }
  ]);
  
  // 입력 투두 
  const [inputValue, setInputValue] = useState('');
  
  // 수정 투두
  const [editValue, setEditValue] = useState('');
  const [edit, setEdit] = useState(null);
  
  // 시계 투두
  const [time, setTime]= useState(new Date());
  
  // 검색
  const [search, setSetsearch] = useState('');
  
  // 할 일 추가 기능
  const addTodo = (contents) => {
    const newTodo = {
      id: uuidv4(),
      contents,
      done : false,
      timestamp: new Date().toLocaleDateString()
    };
    
    if (!inputValue) {
      alert('내용을 입력하세요!');
      return;
    }
    else setTodo([...todo, newTodo]);
  }
  
  // 할 일 삭제
  const handleRemove = (id) => {
    setTodo(todo.filter(t=> t.id !== id));
  };
  
  // 할 일 완료 
  const handledone = (id) => {
    setTodo(todo.map(t => t.id === id ? {...t, done: !t.done} : t));
  };
  
  // 할 일 수정
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };
  
  const handleEditSave = (id) => {
    setTodo(todo.map((t) => (t.id === id ? { ...t, contents: editValue } : t)));
    setEdit(null);
    setEditValue('');
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setInputValue(value);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // addTodo 함수에 값이 inputValue 
    addTodo(inputValue);
    
    // 다시 빈값으로 만들어줌
    setInputValue('');
  };
  
  // 시계
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(id)
    };
  }, []);
  
  // 검색
  const searchItems = (e) => {
    setSetsearch(e.target.value);
  };
  
  // 로컬 스토리지
  useEffect(() => {
    const dbTodo = JSON.parse(localStorage.getItem('todo')) || [];
    setTodo(dbTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);

  return (
    <main>
        <GlobalStyle />
        {/* 현재 시간 */}
        <div className='clock'>
          {time.toLocaleTimeString()}
        </div>

        {/* 타이틀 */}
        <h1 className="app-title">Todo</h1>

        {/* 인풋창과 버튼 */}
        <TodoInputWrapper onSubmit={handleSubmit}>
          {/* 인풋창에 값을 입력하고 버튼을 클릭하면 아이템 추가 */}
          <StyledInput type="text" placeholder='©lis2s2' value={inputValue} onChange={handleChange} />
          <StyledButton type="submit" onClick={handleSubmit}>🚀</StyledButton>
        </TodoInputWrapper>

        {/* 투두 */}
        <TodoBoard 
          todo={todo} 
          onRemove={handleRemove} 
          onDone={handledone} 
          edit={edit}
          editValue={editValue}
          onEdit={(id, contents) => {setEdit(id); setEditValue(contents);}} 
          onEditChange={handleEditChange} 
          onEditSave={handleEditSave}
          onSearch={searchItems}
        />

        {/* <Modal /> */}
      </main>
    );
  }

export default App;