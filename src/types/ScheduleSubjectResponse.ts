import { Teacher } from './Teacher';

export interface SubjectType {
    id: number;
    name: string;
}

export interface ClassroomType {
    id: number;
    floor: number;
    name: string;
}

export interface GroupType {
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
    subgroup?: SubgroupType;
    group: GroupType;
}

interface SubgroupType {
    id: number;
    name: number;
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
