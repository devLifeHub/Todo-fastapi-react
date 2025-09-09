import { todosAdapter } from "./todoSlice";

export const {
  selectAll: selectTodoList,
  selectById: selectTodoById,
  selectEntities: selectTodoEntities,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state) => state.todos || todosAdapter.getInitialState());

export const selectTodoCurrent       = (state) => state.todos?.todoItem ?? null;
export const selectFetchTodosStatus  = (state) => state.todos?.fetchTodosStatus ?? "idle";
export const selectFetchTodosError   = (state) => state.todos?.fetchTodosError ?? null;
export const selectFetchTodoStatus   = (state) => state.todos?.fetchTodoStatus ?? "idle";
export const selectFetchTodoError    = (state) => state.todos?.fetchTodoError ?? null;
export const selectCreateTodoStatus  = (state) => state.todos?.createStatus ?? "idle";
export const selectCreateTodoError   = (state) => state.todos?.createError ?? null;
export const selectUpdateTodoStatus  = (state) => state.todos?.updateStatus ?? "idle";
export const selectUpdateTodoError   = (state) => state.todos?.updateError ?? null;
export const selectPatchTodoStatus   = (state) => state.todos?.patchStatus ?? "idle";
export const selectPatchTodoError    = (state) => state.todos?.patchError ?? null;
export const selectDeleteTodoStatus  = (state) => state.todos?.deleteStatus ?? "idle";
export const selectDeleteTodoError   = (state) => state.todos?.deleteError ?? null;
