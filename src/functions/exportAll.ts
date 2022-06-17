import { store } from '../redux/store';
import { Teacher, TeacherProps } from '../types/Teacher';
import { Group } from '../types/Group';
import { generateProps } from './generateProps';
import { exportTeachersData } from './exportTeacher';
import { DataType } from '../types/Config';
import { loading } from './loading';

export async function exportAllData(data: Teacher[] | Group[]) {
    return await loading(async () => {
        const type = store.getState().config.dataType;
        switch (type) {
            case DataType.teachers:
                return await exportTeachersProps(data as Teacher[]);
        }
    });
}

async function exportTeachersProps(data: Teacher[]) {
    var exportProps: TeacherProps[] = [];
    var { count, year, filename } = store.getState().exportSetting;

    for (let i = 0; i < data.length; i++) {
        try {
            if (i < count) {
                const prop: TeacherProps | undefined = (await generateProps(
                    data[i],
                    year
                )) as TeacherProps | undefined;
                if (prop === undefined) return;
                exportProps.push(prop);
            }
        } catch (e) {
            console.error((e as Error).message);
        }
    }
    if (exportProps.length) await exportTeachersData(filename, exportProps);
    return;
}
