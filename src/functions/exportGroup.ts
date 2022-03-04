import { GroupProps } from '../types/Group';
import { createWorkBook } from './createWorkBook';
import { saveFile } from './saveFile';
import { createGroupWorkSheet } from './createWorkSheet';

export async function exportGroupFile(filename: string, props: GroupProps) {
  const workbook = createWorkBook();
  for (let i = 0; i < props.months.length; i++) {
    if (props.lessons[i].length) {
      createGroupWorkSheet(
        workbook,
        props.months[i],
        props,
        props.months[i],
        i,
        i > 3 ? props.year + 1 : props.year
      );
    }
  }
  const buffer = await workbook.xlsx.writeBuffer();
  saveFile(filename, buffer);
}
