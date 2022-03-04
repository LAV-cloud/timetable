import { Worksheet } from 'exceljs';
import { TeacherProps } from '../types/Teacher';

const rowHeight = 24;
const colWidth = 10;

export function drawTeacherSheet(
  worksheet: Worksheet,
  teacher: string,
  lessonNames: string,
  groups: string[],
  lessons: string[],
  hours: number[][],
  props: TeacherProps,
  cols: number
) {
  var points: string[] = [];
  createColumns(worksheet, groups);
  drawName(worksheet, teacher, cols);
  drawLessonName(worksheet, lessonNames, cols);
  worksheet.addRow([``]);
  drawLessons(worksheet, lessons, cols, points);
  points.pop();
  drawGroups(worksheet, groups);
  drawHours(worksheet, props, hours, cols);
  drawTotal(worksheet, groups, cols);
  drawOther(worksheet, groups, cols);
  for (let i = 1, pointId = 0; i <= cols; i++) {
    var col = worksheet.getColumn(i);
    var find: boolean = false;
    // eslint-disable-next-line no-loop-func
    col.eachCell((cell) => {
      var num = cell.address.replace(/[^0-9]/g, '');
      var char = cell.address.replace(/[0-9]/g, '');
      var point = points[pointId].replace(/[0-9]/g, '');
      cell.font = {
        name: 'Times New Roman',
        size: 11,
      };
      if (+num > 4 && char === point) {
        find = true;
        cell.border = {
          top: { style: +num === 20 || +num === 25 ? 'thick' : 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thick' },
        };
      }
    });
    if (find && pointId + 1 < points.length) pointId++;
  }
}

function drawName(worksheet: Worksheet, teacher: string, cols: number) {
  worksheet
    .addRow([`Фамилия преподавателя ${teacher}`])
    .eachCell({ includeEmpty: true }, function (cell) {
      worksheet.mergeCells(`A2:${getAddress(cols)}2`);
    });
}

function createColumns(worksheet: Worksheet, groups: string[]) {
  worksheet.columns = [
    { header: '', key: 'info', width: colWidth },
    ...groups.map((group: string, i: number) => {
      return {
        header: ``,
        key: `group${i + 1}`,
        width: colWidth,
      };
    }),
    { header: '', key: 'total', width: colWidth },
    { header: '', key: 'list', width: colWidth },
  ];
}

function getAddress(number: number): string {
  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  var address = 'A';
  var count = -1;
  while (number > alphabet.length) {
    number -= alphabet.length;
    count++;
  }
  if (count > -1) {
    address = alphabet[count];
    address += alphabet[number - 1];
  } else {
    address = alphabet[number - 1];
  }
  return address;
}

function drawLessonName(
  worksheet: Worksheet,
  lessonNames: string,
  cols: number
) {
  worksheet
    .addRow([`Наименование предмета ${lessonNames}`])
    .eachCell({ includeEmpty: true }, function (cell) {
      cell.alignment = {
        vertical: 'bottom',
        horizontal: 'left',
        wrapText: true,
      };
    });
  worksheet.mergeCells(`A3:${getAddress(cols)}3`);
}

function drawGroups(worksheet: Worksheet, groups: string[]) {
  var idGroupRow = 0;
  const groupsRow = worksheet.addRow([
    'Месяцы',
    ...groups,
    'Всего',
    'Роспись преподавателя',
  ]);
  const grpRow = worksheet.addRow(['Группы']);
  grpRow.alignment = {
    vertical: 'bottom',
    horizontal: 'right',
  };
  grpRow.height = rowHeight;

  groupsRow.height = rowHeight;
  groupsRow.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    if (idGroupRow !== 0) {
      const clearAddress = cell.address.replace(/\d/, '');
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };
      worksheet.mergeCells(`${clearAddress}${6}:${clearAddress}${7}`);
    }
    idGroupRow++;
  });
}

function drawLessons(
  worksheet: Worksheet,
  lessons: string[],
  cols: number,
  points: string[]
) {
  var start: string = 'A5';
  var end: string = '';
  var lessonRowId: number = 0;
  var lessonsRow = worksheet.addRow(['Курсы', ...lessons, '', '']);
  lessonsRow.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
    if (
      (cell.value !== '' || lessonRowId >= cols - 2) &&
      cell.address !== start
    ) {
      points.push(end);
      worksheet.mergeCells(`${start}:${end}`);
      end = cell.address;
      start = end;
    } else {
      end = cell.address;
    }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
    lessonRowId++;
  });
}

function drawHours(
  worksheet: Worksheet,
  props: TeacherProps,
  hours: number[][],
  cols: number
) {
  for (let i = 0; i < 12; i++) {
    const hoursRow = worksheet.addRow([props.months[i], ...hours[i], '', '']);
    var idHoursRow = 0;
    hoursRow.height = rowHeight;
    // eslint-disable-next-line no-loop-func
    hoursRow.eachCell((cell, rowNumber) => {
      if (idHoursRow !== 0) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      var address = getAddress(cols - 1);
      var clearAddress = address + (i + 8);
      if (cell.address === clearAddress) {
        address = getAddress(cols - 2);
        clearAddress = address + (i + 8);
        cell.value = {
          formula: `SUM(B${i + 8}:${clearAddress})`,
          date1904: false,
        };
      }
      idHoursRow++;
    });
  }
}

function drawOther(worksheet: Worksheet, groups: string[], cols: number) {
  const other: string[] = [
    'Всего часов по плану',
    'Минус 4% празничных',
    'Не выполнено часов',
    'Экзамены (заносятся на основе экзам. ведомости)',
    'Всего дано за год час.',
  ];
  other.map((item: string, i: number) => {
    const otherRow = worksheet.addRow([
      item,
      ...groups.map((group: string) => {
        return '';
      }),
      '',
      '',
    ]);
    otherRow.height = rowHeight;
    var end: string = '';
    return otherRow.eachCell((cell, rowNumber) => {
      if (item === other[other.length - 1]) {
        cell.border = {
          top: { style: 'thick' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      } else {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
      const clearAddress = cell.address.replace(/\d/g, '');
      if (clearAddress === 'A') {
        cell.alignment = {
          vertical: 'bottom',
          horizontal: 'left',
          wrapText: true,
        };
      } else {
        cell.alignment = {
          vertical: 'bottom',
          horizontal: 'center',
          wrapText: true,
        };
      }
      if (cell.address === `${getAddress(cols - 1)}2${i + 1}`) {
        cell.value = {
          formula: `SUM(B2${i + 1}:${end})`,
          date1904: false,
        };
      } else {
        end = cell.address;
      }
    });
  });
}

function drawTotal(worksheet: Worksheet, groups: string[], cols: number) {
  const totalRow = worksheet.addRow([
    'Всего дано',
    ...groups.map(() => 0),
    0,
    '',
  ]);
  totalRow.height = rowHeight;
  for (let i = 1; i <= cols - 2; i++) {
    var col = worksheet.getColumn(i);
    col.eachCell((cell) => {
      var num = cell.address.replace(/[^0-9]/g, '');
      var char = cell.address.replace(/[0-9]/g, '');
      if (+num === 20 && char !== 'A') {
        cell.value = {
          formula: `SUM(${char}8:${char}19)`,
          date1904: false,
        };
      }
    });
  }
  var end = '';
  totalRow.eachCell((cell, rowNumber) => {
    var char = cell.address.replace(/[0-9]/g, '');
    if (char !== 'A') {
      cell.alignment = {
        vertical: 'bottom',
        horizontal: 'center',
        wrapText: true,
      };
    } else {
      cell.alignment = {
        vertical: 'bottom',
        horizontal: 'left',
        wrapText: true,
      };
    }
    cell.border = {
      top: { style: 'thick' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    if (cell.address === `${getAddress(cols - 1)}20`) {
      cell.value = {
        formula: `SUM(B20:${end})`,
        date1904: false,
      };
    } else {
      end = cell.address;
    }
  });
}
