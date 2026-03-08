
// APIレスポンス用 共通DTO

export type ProfileDTO = {
  id: string;
  displayName: string;
};

export type TimelogDTO = {
  id: string;
  title: string;
  startAt: string; // ISO文字列
  endAt: string | null;
}

export type CategoryDTO = {
  id: string
  name: string
  colorToken?: string
}


//================================================


// プロフィール系 (Get/Put)
export namespace ProfileAPI {
  // GET /api/profile
  export namespace Get {
    export type Response = { profile: ProfileDTO };
  };
  // PUT /api/profile
  export namespace Put {
    export type Request = { displayName: string };
    export type Response = { profile: ProfileDTO };
  };
}


// タイムログ系 (Get/Start/End)
export namespace TimelineAPI {
  // GET /api/timeline
  export namespace GetTimelog {
    export type Response = { timelog: TimelogDTO[] };
  };
  // POST /api/timeline/start
  export namespace Start {
    export type Request = {
      categoryId: string,
      startAt: string, //ISO
    };
    export type Response = { timelog: TimelogDTO };
  };
  // POST /api/timeline/end
  export namespace End {
    export type Request = {
      categoryId: string,
      endAt: string, //ISO
    };
    export type Response = { timelog: TimelogDTO };
  };
}


// カテゴリ系 (Get)
export namespace CategoryAPI {
  // GET /api/timeline/[id]
  export namespace Get {
    export type Response = { category: CategoryDTO }
  };
}







