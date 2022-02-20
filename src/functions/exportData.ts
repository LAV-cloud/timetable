import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import { Lesson, Group } from '../types/Teacher';

export const exportData = (
  filename: string,
  csvData: Lesson[],
  workSheetName: string = 'data'
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const workBook = xlsx.utils.book_new();
  const workSheet = createWorkSheet(csvData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);

  const excelBuffer = xlsx.write(workBook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
};

function createWorkSheet(data: Lesson[]) {
  var lessonNames: string[] = [];
  var groupNames: string[] = [];
  var groups: Group[] = [];
  var hours: string[][] = [];
  var maxRow: number = 0;
  data.map((lesson: Lesson) => {
    lessonNames.push(lesson.name);
    for (let i = 0; i < lesson.groups.length - 1; i++) {
      lessonNames.push('');
    }
    lesson.groups.map((group: Group) => {
      groups.push(group);
      groupNames.push(group.print);
      maxRow = group.hours.length;
      return group;
    });
    return lesson;
  });

  for (let i = 0; i < maxRow; i++) {
    hours.push(['']);
    for (let j = 0; j < groups.length; j++) {
      hours[i][j] = groups[j].hours[i].toString();
    }
  }

  const workSheetData = [lessonNames, groupNames, ...hours];
  return xlsx.utils.aoa_to_sheet(workSheetData);
}
