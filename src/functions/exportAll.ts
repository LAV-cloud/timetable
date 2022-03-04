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

  await Promise.all(
    data.map(async (teacher: Teacher, i: number) => {
      if (i < count) {
        const prop: TeacherProps | undefined = (await generateProps(
          teacher,
          year
        )) as TeacherProps | undefined;
        if (prop === undefined) return;
        exportProps.push(prop);
      }
    })
  );
  if (exportProps.length) await exportTeachersData(filename, exportProps);
  return;
}
