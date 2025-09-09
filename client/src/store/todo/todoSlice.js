import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import todoThunks from "./todoThunks";

const {
  fetchTodos,
  fetchTodo,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
} = todoThunks;

export const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = todosAdapter.getInitialState({
  todoItem: null,

  fetchTodosStatus: "idle",
  fetchTodosError: null,

  fetchTodoStatus: "idle",
  fetchTodoError: null,

  createStatus: "idle",
  createError: null,

  updateStatus: "idle",
  updateError: null,

  patchStatus: "idle",
  patchError: null,

  deleteStatus: "idle",
  deleteError: null,
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodoItem: (state) => {
      state.todoItem = null;
      state.fetchTodoError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchTodos.pending, (state) => {
        state.fetchTodosStatus = "loading";
        state.fetchTodosError = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.fetchTodosStatus = "succeeded";
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.fetchTodosStatus = "failed";
        state.fetchTodosError = action.payload;
      })

      // FETCH ONE
      .addCase(fetchTodo.pending, (state) => {
        state.fetchTodoStatus = "loading";
        state.fetchTodoError = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.fetchTodoStatus = "succeeded";
        state.todoItem = action.payload;
        todosAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.fetchTodoStatus = "failed";
        state.fetchTodoError = action.payload;
      })

      // CREATE
      .addCase(createTodo.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        todosAdapter.addOne(state, action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })

      // UPDATE (PUT)
      .addCase(updateTodo.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        todosAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })

      // PATCH
      .addCase(patchTodo.pending, (state) => {
        state.patchStatus = "loading";
        state.patchError = null;
      })
      .addCase(patchTodo.fulfilled, (state, action) => {
        state.patchStatus = "succeeded";
        todosAdapter.upsertOne(state, action.payload);
      })
      .addCase(patchTodo.rejected, (state, action) => {
        state.patchStatus = "failed";
        state.patchError = action.payload;
      })

      // DELETE
      .addCase(deleteTodo.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        todosAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });
  },
});

export const { clearTodoItem } = todosSlice.actions;
export default todosSlice.reducer;











// import { createSlice } from "@reduxjs/toolkit"
// import todoThunks from "./todoThunks"

// const {
//   fetchTodos,
//   fetchTodo,
//   createTodo,
//   updateTodo,
//   patchTodo,
//   deleteTodo,
// } = todoThunks

// const initialState = {
//   todoList:               [],      // все задачи
//   todoItem:            null,    // выбранная задача

//   fetchTodosStatus:   "idle",  // idle | loading | succeeded | failed
//   fetchTodosError:    null,

//   fetchTodoStatus:    "idle",
//   fetchTodoError:     null,

//   createStatus:       "idle",
//   createError:        null,

//   updateStatus:       "idle",
//   updateError:        null,

//   patchStatus:       "idle",
//   patchError:        null,

//   deleteStatus:       "idle",
//   deleteError:        null,
// }


// // проверить все slice
// const todosSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     clearTodoItem: (s) => {
//       s.todoItem = null
//       s.fetchTodoError = null
//     },
//   },
//   extraReducers: builder => {
//     // FETCH ALL
//     builder
//     .addCase(fetchTodos.pending, s => {
//       s.fetchTodosStatus = "loading";
//       s.fetchTodosError = null
//     })
//     .addCase(fetchTodos.fulfilled, (s, a) => {
//       s.fetchTodosStatus = "succeeded";
//       console.log("s", s)
//       console.log("a", a)
//       s.todoList = a.payload
//     })
//     .addCase(fetchTodos.rejected, (s, a) => {
//       s.fetchTodosStatus = "failed";
//       s.fetchTodosError = a.payload
//     })

//     // FETCH ONE
//     builder
//     .addCase(fetchTodo.pending, s => {
//       s.fetchTodoStatus  = "loading";
//       s.fetchTodoError = null;
//     })
//     .addCase(fetchTodo.fulfilled, (s, a) => {
//       console.log("action todo", a.payload)
//       s.fetchTodoStatus  = "succeeded";
//       s.todoItem = a.payload;
//     })
//     .addCase(fetchTodo.rejected, (s, a) => {
//       s.fetchTodoStatus  = "failed";
//       s.fetchTodoError = a.payload;
//     })

//     // CREATE
//     builder
//     .addCase(createTodo.pending, s => {
//       s.createStatus = "loading";
//       s.createError = null
//     })
//     .addCase(createTodo.fulfilled, (s, a) => {
//       s.createStatus = "succeeded";
//       s.todoList.push(a.payload)
//     })
//     .addCase(createTodo.rejected, (s, a) => {
//       s.createStatus = "failed";
//       s.createError = a.payload
//     })

//         // UPDATE (PUT)
//     builder
//       .addCase(updateTodo.pending, s => {
//         s.updateStatus = "loading";
//         s.updateError = null;
//       })
//       .addCase(updateTodo.fulfilled, (s, a) => {
//         s.updateStatus = "succeeded";
//         const idx = s.todoList.findIndex(t => t.id === a.payload.id);
//         if (idx !== -1) s.todoList[idx] = a.payload;
//       })
//       .addCase(updateTodo.rejected, (s, a) => {
//         s.updateStatus = "failed";
//         s.updateError = a.payload;
//       });

//     // PATCH (PATCH)
//     builder
//       .addCase(patchTodo.pending, s => {
//         s.patchStatus = "loading";
//         s.patchError = null;
//       })
//       .addCase(patchTodo.fulfilled, (s, a) => {
//         s.patchStatus = "succeeded";
//         const idx = s.todoList.findIndex(t => t.id === a.payload.id);
//         if (idx !== -1) s.todoList[idx] = a.payload;
//       })
//       .addCase(patchTodo.rejected, (s, a) => {
//         s.patchStatus = "failed";
//         s.patchError = a.payload;
//       });


//     // DELETE
//     builder
//     .addCase(deleteTodo.pending, s => {
//       s.deleteStatus = "loading";
//       s.deleteError = null
//     })
//     .addCase(deleteTodo.fulfilled, (s, a) => {
//       s.deleteStatus = "succeeded"
//       s.todoList = s.todoList.filter(t => t.id !== a.payload)
//     })
//     .addCase(deleteTodo.rejected, (s, a) => {
//       s.deleteStatus = "failed";
//       s.deleteError = a.payload
//     })
//   }
// })

// export const { clearTodoItem } = todosSlice.actions
// export default todosSlice.reducer
