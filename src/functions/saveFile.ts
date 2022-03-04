import saveAs from 'file-saver';
import ExcelJS from 'exceljs';

export function saveFile(filename: string, buffer: ExcelJS.Buffer) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const data = new Blob([buffer], { type: fileType });
  saveAs(data, filename + fileExtension);
}
