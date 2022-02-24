import { Teacher } from './Teacher';

export interface Week {
  id: number;
  month: number;
  year: number;
}

interface MetaType {
  count: number;
  breakTime: number;
  lastUpdateTime: number;
}

export interface ResponseType {
  status: boolean;
  data: {
    meta: MetaType;
    items: ItemType[];
  };
}

interface SubjectType {
  id: number;
  name: string;
}

interface ClassroomType {
  id: number;
  floor: number;
  name: string;
}

interface GroupType {
  id: number;
  name: number;
  print: string;
}

export interface ItemType {
  id: number;
  day: number;
  sort: number;
  time: {
    start: number;
    length: number;
  };
  teacher: Teacher;
  subject: SubjectType;
  classroom: ClassroomType;
  group: GroupType;
}
