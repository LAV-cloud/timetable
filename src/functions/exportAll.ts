import { store } from '../redux/store';
import { LoaderActionType } from '../types/Loader';
import { Teacher, TeacherProps } from '../types/Teacher';
import { Group, GroupProps } from '../types/Group';
import { generateProps } from './generateProps';
import { exportTeachersData } from './exportTeacher';
import { DataType } from '../types/Data';

export async function exportAllData(data: Teacher[] | Group[]) {
  startLoading();
  const type = store.getState().data.dataType;
  switch (type) {
    case DataType.teachers:
      await exportTeachersProps(data as Teacher[]);
      break;
    case DataType.groups:
      await exportGroupsProps(data as Group[]);
      break;
  }
  finishLoading();
}

async function exportGroupsProps(data: Group[]) {
  // var exportProps: GroupProps[] = [];
  // var { count, year, filename } = store.getState().exportSetting;

  // data.map(async (group: Group, i: number) => {
  //   if (i < count) {
  //     const prop: GroupProps | undefined = (await generateProps(
  //       group,
  //       year
  //     )) as GroupProps | undefined;
  //     if (prop === undefined) return;
  //     exportProps.push(prop);
  //   }
  // });
  // if (exportProps.length) await exportTeachersData(filename, exportProps);
  return;
}

async function exportTeachersProps(data: Teacher[]) {
  var exportProps: TeacherProps[] = [];
  var { count, year, filename } = store.getState().exportSetting;

  data.map(async (teacher: Teacher, i: number) => {
    if (i < count) {
      const prop: TeacherProps | undefined = (await generateProps(
        teacher,
        year
      )) as TeacherProps | undefined;
      if (prop === undefined) return;
      exportProps.push(prop);
    }
  });
  if (exportProps.length) await exportTeachersData(filename, exportProps);
  return;
}

const startLoading = () =>
  store.dispatch({ type: LoaderActionType.startLoading });

const finishLoading = () =>
  store.dispatch({ type: LoaderActionType.finishLoading });
