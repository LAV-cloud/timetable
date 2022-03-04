import { TeacherProps } from '../types/Teacher';
import { createTeacherWorkSheet } from './createWorkSheet';
import { createWorkBook } from './createWorkBook';
import { saveFile } from './saveFile';

export const exportTeacherFile = async (
  filename: string,
  props: TeacherProps
) => {
  const workbook = createWorkBook();
  createTeacherWorkSheet(
    workbook,
    props.teacher!.fullName,
    props,
    props.teacher!.fullName
  );
  const buffer = await workbook.xlsx.writeBuffer();
  saveFile(filename, buffer);
};

export async function exportTeachersData(
  filename: string,
  teachersProps: TeacherProps[]
) {
  const workbook = createWorkBook();
  teachersProps.map((prop) => {
    if (prop.lessons.length)
      createTeacherWorkSheet(
        workbook,
        prop.teacher.fullName,
        prop,
        prop.teacher.fullName
      );
    return prop;
  });
  const buffer = await workbook.xlsx.writeBuffer();
  saveFile(filename, buffer);
}
