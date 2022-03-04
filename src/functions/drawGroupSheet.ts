import { Worksheet } from 'exceljs';
import { Group, Lesson } from '../types/Group';
import { Day } from '../types/Week';

const colWidth = 4;

export function drawGroupSheet(
  worksheet: Worksheet,
  group: Group,
  days: Day[],
  lesson: Lesson[],
  month: string,
  year: number
) {
  createColumns(worksheet, days);
  worksheet.addRow(['', '', ...days.map(() => ''), '']).eachCell((cell) => {
    if (cell.address === 'Q2') cell.value = 'ВЕДОМОСТЬ';
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  });
  worksheet.mergeCells(
    `${getAddress(days.length - 6)}2:${getAddress(days.length + 3)}2`
  );
  worksheet.addRow(['', '', ...days.map(() => ''), '']).alignment = {
    vertical: 'middle',
    horizontal: 'right',
  };
  worksheet.mergeCells(
    `${getAddress(days.length - 6)}3:${getAddress(days.length + 3)}3`
  );
  worksheet.getColumn(days.length + 3).eachCell((cell) => {
    if (cell.address === `${getAddress(days.length + 3)}2`)
      cell.value = 'Директор  НКЭиВТ';
    if (cell.address === `${getAddress(days.length + 3)}3`)
      cell.value = '_________ А.В. Безгеймер';
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'right',
    };
  });
  worksheet.addRow([
    '',
    '',
    'учета часов преподавателя',
    ...days.map(() => ''),
  ]).alignment = {
    vertical: 'middle',
    horizontal: 'center',
  };
  worksheet.mergeCells(`C4:${getAddress(days.length + 2)}4`);
  worksheet.addRow([]);
  worksheet.addRow([
    '',
    '',
    `курс ${group.course} группа ${group.print} месяц ${month} ${year}г.`,
    ...days.map(() => ''),
  ]).alignment = {
    vertical: 'middle',
    horizontal: 'center',
  };
  worksheet.mergeCells(`C6:${getAddress(days.length + 2)}6`);
  worksheet.addRow([]);
  drawHours(worksheet, lesson, days);
  var total: number = 0;
  lesson.map((les: Lesson) => {
    les.hours.map((hour: number) => (total += hour));
    return les;
  });
  drawTotal(worksheet, days, total);
  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow(['', 'Секретарь учебной части:__________']);
  worksheet.addRow([]);
  worksheet.addRow(['', 'Зам. директора по УПР: __________']);
  for (let i = -2; i < days.length; i++) {
    var col = worksheet.getColumn(i + 3);
    col.eachCell((cell) => {
      const num = cell.address.replace(/[^0-9]/g, '');
      if (
        i >= 0 &&
        +num > 8 &&
        +num <= lesson.length + 10 &&
        days[i].day === 0
      ) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '808080' },
        };
      }
    });
  }
  for (let i = 1; i <= days.length + 3; i++) {
    var col = worksheet.getColumn(i);
    col.eachCell((cell) => {
      cell.font = {
        name: 'Times New Roman',
        size: 11,
      };
    });
  }
}

function createColumns(worksheet: Worksheet, days: Day[]) {
  worksheet.columns = [
    { header: '', key: 'id', width: colWidth },
    { header: '', key: 'lessons', width: 70 },
    ...days.map((day: Day, i: number) => {
      return {
        header: ``,
        key: `day${day.id}`,
        width: colWidth,
      };
    }),
    { header: '', key: 'total', width: 12 },
  ];
}

function drawHours(worksheet: Worksheet, lesson: Lesson[], days: Day[]) {
  worksheet
    .addRow(['', '', 'ЧИСЛА МЕСЯЦА', ...days.map(() => '')])
    .eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  worksheet
    .addRow(['', '', ...days.map((day) => day.id), 'ВСЕГО'])
    .eachCell((cell) => {
      if (cell.address === `${getAddress(days.length + 3)}9`) {
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
    });
  worksheet.mergeCells(`A8:A9`);
  worksheet.mergeCells(`B8:B9`);
  worksheet.mergeCells(`C8:${getAddress(days.length + 2)}8`);
  for (let i = 0; i < lesson.length; i++) {
    var sum: number = 0;
    lesson[i].hours.map((hour) => (sum += hour));
    const row = worksheet.addRow([
      i + 1,
      `${lesson[i].subject.name} ${lesson[i].teacher.secondName} ${lesson[i].teacher.firstName[0]}.${lesson[i].teacher.thirdName[0]}.`,
      ...lesson[i].hours.map((hour) => (hour !== 0 ? hour.toString() : '')),
      sum.toString(),
    ]);
    row.eachCell((cell) => {
      const cellCol = cell.address.replace(/[0-9]/g, '');
      if (cellCol === getAddress(1)) {
        cell.alignment = {
          vertical: 'bottom',
          horizontal: 'right',
        };
      } else if (cellCol === getAddress(2)) {
        cell.alignment = {
          vertical: 'bottom',
          horizontal: 'left',
        };
      } else if (cellCol === getAddress(days.length + 3)) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      } else {
        cell.alignment = {
          vertical: 'bottom',
          horizontal: 'right',
        };
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  }
}

function drawTotal(worksheet: Worksheet, days: Day[], total: number) {
  const row = worksheet.addRow([
    '',
    'ИТОГО:',
    ...days.map(() => ''),
    total.toString(),
  ]);
  row.eachCell((cell) => {
    const cellCol = cell.address.replace(/[0-9]/g, '');
    if (cellCol === getAddress(2)) {
      cell.alignment = {
        vertical: 'bottom',
        horizontal: 'right',
      };
    } else if (cellCol === getAddress(days.length + 3)) {
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
  });
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
