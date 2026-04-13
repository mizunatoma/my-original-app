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

export type GetProfileResponse = {
  profile: ProfileDTO
}

export type UpdateProfileRequest = {
  displayName: string
}

export type UpdateProfileResponse = {
  profile: ProfileDTO
}

//===Timeline=============================================
export type TimelogDTO = {
  id: string
  title: string
  startAt: string // ISO文字列
  endAt: string | null
  category: {
    colorToken?: string
  }
}

export type RunningTimelogDTO = {
  id: string
  activityId: string
  activityName: string
  colorToken: string
  startAt: string // ISO文字列
}

// タイムログ系 (Get/Start/End)
export namespace TimelineAPI {
  // GET /api/timeline
  export namespace Get {
    export type Response = { activities: TimelogDTO[] }
  }
  // POST /api/timeline/start
  export namespace Start {
    export type Request = {
      activityId: string
      startAt: string //ISO
    }
    export type Response = { timelog: TimelogDTO }
  }
  // GET /api/timeline/running
  export namespace Running {
    export type Response =
      | { running: false }
      | {
          running: true
          log: RunningTimelogDTO
        }
  }
  // POST /api/timeline/end
  export namespace End {
    export type Request = {
      activityId: string
      endAt: string //ISO
    }
    export type Response = { timelog: TimelogDTO }
  }
}

//===Category=============================================
export type CategoryDTO = {
  id: string
  name: string
  colorToken?: string
}

// カテゴリ系 (Get)
export namespace CategoryAPI {
  // GET /api/timeline/[id]
  export namespace Get {
    export type Response = { category: CategoryDTO }
  }
}

//===TodoList=============================================
export type TodoListDTO = {
  id: string
  profileId: string
  name: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type TodoItemDTO = {
  id: string
  todoListId: string
  title: string
  isDone: boolean
  doneAt: string | null
  createdAt: string
  updatedAt: string
}

// TodoList (Get/Post/Put)
export namespace TodoListsAPI {
  // GET /api/todo-lists
  export namespace Get {
    export type Response = { todoLists: TodoListDTO[] }
  }
  // POST /api/todo-lists
  export namespace Post {
    export type Request = { name: string }
    export type Response = { todoList: TodoListDTO }
  }
  // PUT /api/todo-lists/[listId]
  export namespace Put {
    export type Request = { name: string }
    export type Response = { todoList: TodoListDTO }
  }
}

// TodoItem (Get/Post/Put)
export namespace TodoItemsAPI {
  // GET /api/todo-lists/[listId]/todos
  export namespace Get {
    export type Response = { todos: TodoItemDTO[] }
  }
  // POST /api/todo-lists/[listId]/todos
  export namespace Post {
    export type Request = { title: string }
    export type Response = { todo: TodoItemDTO }
  }
  // PUT /api/todos/[todoId]
  export namespace Put {
    export type Request = { title: string; isDone: boolean }
    export type Response = { todo: TodoItemDTO }
  }
}

//===Analytics=============================================
// analytics (Get)
export namespace AnalyticsAPI {
  // GET /api/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD
  export namespace Get {
    export type Response = {
      byCategory: {
        id: string
        name: string
        colorToken: string | null
        totalMinutes: number
      }[]
    }
  }
}
