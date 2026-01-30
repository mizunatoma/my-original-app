
//共通DTO (APIレスポンス用)
export type ProfileDTO = {
  id: string;
  displayName: string;
};

export type TimelineActivityDTO = {
  id: string;
  title: string;
  startAt: string; // ISO文字列
  endAt: string | null;
}


// Profile API (/api/profile)
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


// Timeline API (/api/timeline)
export namespace TimelineAPI {
  // GET /api/timeline
  export namespace Get {
    export type Response = { activities: TimelineActivityDTO[] };
  };
  // POST /api/timeline/start
  export namespace Start {
    export type Request = {
      activityId: string,
      startAt: string, //ISO
    };
    export type Response = {
      activity: TimelineActivityDTO;
    };
  };
  // POST /api/timeline/end
  export namespace End {
    export type Request = {
      activityId: string,
      endAt: string, //ISO
    };
    export type Response = {
      activity: TimelineActivityDTO;
    };
  };
}












