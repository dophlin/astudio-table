const maxLength = 200;
export const renderCellValue = (value: any): string => {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return value.map(renderCellValue).join(', ').slice(0, maxLength);
      }
      return Object.entries(value)
        .map(([key, nestedValue]) => {
          if (typeof nestedValue === 'object' && nestedValue !== null) {
            return `${key}: { ${renderCellValue(nestedValue)} }`;
          }
          return `${key}: ${nestedValue}`;
        })
        .join(', ').slice(0, maxLength);;
    }
    return String(value).slice(0, maxLength);;
  };