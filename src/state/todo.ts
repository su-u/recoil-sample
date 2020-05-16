import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All"
});

export const todoListState = atom({
  key: "todoListState",
  default: []
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter(item => item.isComplete);
      case "Show Uncompleted":
        return list.filter(item => !item.isComplete);
      default:
        return list;
    }
  }
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(filteredTodoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter(item => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted
    };
  }
});
