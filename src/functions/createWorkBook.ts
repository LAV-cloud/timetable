import { Workbook } from 'exceljs';
import ExcelJS from 'exceljs';

export function createWorkBook(name: string = 'App'): Workbook {
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
