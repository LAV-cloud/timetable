import { Workbook, Worksheet } from 'exceljs';
import { Group, Lesson, Teacher, TeacherProps } from '../types/Teacher';
import { draw } from './drawSheet';

export function createWorkSheet(
  workbook: Workbook,
  name: string,
  props: TeacherProps,
  teacher: Teacher
) {
  var lessonNames: string = '';
  var lessons: string[] = [];
  var lessonGroupCount: number[] = [];
  var groups: string[] = [];
  var allGroups: Group[] = [];
  var hours: number[][] = [];
  var cols: number = 3;

  props.lessons.map((lesson: Lesson, i: number) => {
    lessonNames += `${lesson.name}, `;
    lessons.push(lesson.name);
    cols += lesson.groups.length;
    for (let y = 0; y < lesson.groups.length - 1; y++) {
      lessons.push('');
    }
    lessonGroupCount.push(groups.length);
    for (let n = 0; n < 12; n++) {
      hours[n] = [0];
    }
    lesson.groups.map((group: Group, j: number) => {
      groups.push(group.print);
      allGroups.push(group);
      return group;
    });
    return lesson;
  });

  for (let i = 0; i < 12; i++) {
    for (let x = 0; x < allGroups.length; x++) {
      hours[i][x] = allGroups[x].hours[i];
    }
  }

  const worksheet: Worksheet = workbook.addWorksheet(name);
  draw(worksheet, teacher, lessonNames, groups, lessons, hours, props, cols);
}
