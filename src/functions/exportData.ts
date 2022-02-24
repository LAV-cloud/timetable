import * as FileSaver from 'file-saver';
import { TeacherState, TeacherProps, Teacher } from '../types/Teacher';
import ExcelJS, { Workbook } from 'exceljs';
import { createWorkSheet } from './createWorkSheet';

export const exportFile = async (filename: string, state: TeacherState) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'App';
  workbook.lastModifiedBy = 'App';
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
  createWorkSheet(
    workbook,
    state.teacher!.fullName,
    state.props!,
    state.teacher!
  );
  const buffer = await workbook.xlsx.writeBuffer();
  const data = new Blob([buffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
};

export async function exportData(
  filename: string,
  teachers: Teacher[],
  teachersProps: TeacherProps[]
) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const workbook = createWorkBook('App');
  teachersProps.map((props: TeacherProps, i: number) => {
    if (props.lessons.length) {
      createWorkSheet(workbook, teachers[i].fullName, props, teachers[i]);
    }
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const data = new Blob([buffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
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
