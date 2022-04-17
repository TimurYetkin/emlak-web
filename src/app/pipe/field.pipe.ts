import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'field',
})
export class FieldPipe implements PipeTransform {
  constructor() {}

  transform(value: any, ...args: any[]): any {
    const column: any = args[0];
    let result = value;
    let fixedResult = null;

    if (column.multi) {
      let separator = column.separator || ' ';
      fixedResult = [];
      for (let field of column.field) {
        const fieldValue = this.fixInnerObjectValue(result, field);
        if (fieldValue !== null) {
          fixedResult.push(fieldValue);
        }
      }
      fixedResult = fixedResult.join(separator);
    } else if (typeof column.custom == 'function') {
      fixedResult = column.custom(value);
    } else {
      fixedResult = this.fixInnerObjectValue(result, column.field);
    }

    return fixedResult;
  }

  fixInnerObjectValue(result, field) {
    field += '';
    field.split('.').forEach((f) => {
      result = result ? result[f] : null;
    });

    return result;
  }
}
