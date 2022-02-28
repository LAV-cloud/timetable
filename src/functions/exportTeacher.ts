import { saveAs } from 'file-saver';
import { TeacherState, TeacherProps } from '../types/Teacher';
import ExcelJS, { Workbook } from 'exceljs';
import { createWorkSheet } from './createWorkSheet';

export const exportTeacherFile = async (
  filename: string,
  state: TeacherState
) => {
  const workbook = createWorkBook();
  createWorkSheet(
    workbook,
    state.teacher!.fullName,
    state.props!,
    state.teacher!.fullName
  );
  const buffer = await workbook.xlsx.writeBuffer();
  saveFile(filename, buffer);
};

export async function exportTeachersData(
  filename: string,
  teachersProps: { teacher: string; props: TeacherProps }[]
) {
  const workbook = createWorkBook();
  teachersProps.map((prop) => {
    if (prop.props.lessons.length)
      createWorkSheet(workbook, prop.teacher, prop.props, prop.teacher);
    return prop;
  });
  const buffer = await workbook.xlsx.writeBuffer();
  saveFile(filename, buffer);
}

function createWorkBook(name: string = 'App'): Workbook {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = name;
  workbook.lastModifiedBy = name;
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      firstSheet: 0,
      activeTab: 1,
      visibility: 'visible',
    },
  ];
  return workbook;
}

function saveFile(filename: string, buffer: ExcelJS.Buffer) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const data = new Blob([buffer], { type: fileType });
  saveAs(data, filename + fileExtension);
}
