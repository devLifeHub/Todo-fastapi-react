import { createAsyncThunk } from "@reduxjs/toolkit"
import todoApi from "../../api/services/todos"

const { fetchTodos, fetchTodo, createTodo, updateTodo, patchTodo, deleteTodo} = todoApi

const todoThunks = {
  fetchTodos: createAsyncThunk(
    "todos/fetchAll",
    async (_, thunk) => {
      try {
        const response = await fetchTodos()
        return response.data
      } catch (err) {
        return thunk.rejectWithValue(err.response?.data || err.message)
      }
    }
  ),

  fetchTodo: createAsyncThunk(
    "todos/fetchOne",
    async (id, thunk) => {
      try {
        const response = await fetchTodo(id)
        return response.data
      } catch (err) {
        return thunk.rejectWithValue(err.response?.data || err.message)
      }
    }
  ),

  createTodo: createAsyncThunk(
    "todos/create",
    async (data, thunk) => {
      try {
        const response = await createTodo(data)
        return response.data
      } catch (err) {
        return thunk.rejectWithValue(err.response?.data || err.message)
      }
    }
  ),

  updateTodo: createAsyncThunk(
    "todos/update",
    async ({ id, data }, thunk) => {
      try {
        const response = await updateTodo(id, data)
        return response.data
      } catch (err) {
        return thunk.rejectWithValue(err.response?.data || err.message)
      }
    }
  ),

  patchTodo: createAsyncThunk(
    "todos/patch",
    async ({ id, data }, thunk) => {
      try {
        const response = await patchTodo(id, data)
        return response.data
      } catch (err) {
        return thunk.rejectWithValue(err.response?.data || err.message)
      }
    }
  ),

  deleteTodo: createAsyncThunk(
    "todos/delete",
    async (id, thunk) => {
      try {
        await deleteTodo(id)
        return id
      } catch (err) {
        return thunk.rejectWithValue(err.response?.data || err.message)
      }
    }
  ),
}

export default todoThunks