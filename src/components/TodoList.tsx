import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  todoListFilterState,
  todoListState,
  filteredTodoListState,
  todoListStatsState
} from "../state/todo";
import { TodoItem } from "./TodoItem";

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

const TodoListStats = () => {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
};

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false
      }
    ]);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

export const TodoList = () => {
  // changed from todoListState to filteredTodoListState
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map(todoItem => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  );
};
