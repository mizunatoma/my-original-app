//===ContactForm=============================================
export type ContactRequestBody = {
  name: string
  email: string
  message: string
}

//===Profile=============================================
export type ProfileDTO = {
  id: string
  displayName: string | null
}

// GET /api/profile
export type GetProfileResponse = { profile: ProfileDTO }
// PUT /api/profile
export type UpdateProfileRequest = { displayName: string }
// PUT, POST /api/profile
export type UpdateProfileResponse = { profile: ProfileDTO }

//===Timelog=============================================
export type TimelogDTO = {
  id: string
  title: string
  startAt: string // ISO文字列
  endAt: string | null
  category: {
    colorToken: string | null
  }
}

// GET /api/timeline
export type GetTimelogResponse = { activities: TimelogDTO[] }
// POST /api/timeline/start
export type StartTimelogRequest = { activityId: string }
export type StartTimelogResponse = { timelog: TimelogDTO }
// POST /api/timeline/end
export type EndTimelogResponse = { timelog: TimelogDTO }

// GET /api/timeline/running
export type GetRunningTimelogResponse =
  | { running: false }
  | {
      running: true
      log: {
        id: string
        activityId: string
        activityName: string
        colorToken: string
        startAt: string // ISO文字列
      }
    }

//===Category=============================================
export type CategoryDTO = {
  id: string
  name: string
  colorToken: string | null
}

// GET /api/timeline/categories
export type GetCategoriesResponse = { categories: CategoryDTO[] }
// GET /api/timeline/[id]
export type GetCategoryResponse = { category: CategoryDTO }

//===TodoList=============================================
export type TodoListDTO = {
  id: string
  profileId: string
  name: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// GET /api/todo-lists
export type GetTodoListsResponse = { todoLists: TodoListDTO[] }
// POST /api/todo-lists
export type CreateTodoListRequest = { name: string }
export type CreateTodoListResponse = { todoList: TodoListDTO }
// PUT /api/todo-lists/[listId]
export type UpdateTodoListRequest = { name: string }
export type UpdateTodoListResponse = { todoList: TodoListDTO }

//===TodoItem=============================================
export type TodoItemDTO = {
  id: string
  todoListId: string
  title: string
  isDone: boolean
  doneAt: string | null
  createdAt: string
  updatedAt: string
}

// GET /api/todo-lists/[listId]/todos
export type GetTodoItemsResponse = { todos: TodoItemDTO[] }
// POST /api/todo-lists/[listId]/todos
export type CreateTodoItemsRequest = { title: string }
export type CreateTodoItemsResponse = { todo: TodoItemDTO }
// PUT /api/todos/[todoId]
export type UpdateTodoItemsRequest = { title: string; isDone: boolean }
export type UpdateTodoItemsResponse = { todo: TodoItemDTO }

//===Analytics=============================================

// GET /api/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD
export type GetAnalyticsResponse = {
  byCategory: {
    id: string
    name: string
    colorToken: string | null
    totalMinutes: number
  }[]
}
