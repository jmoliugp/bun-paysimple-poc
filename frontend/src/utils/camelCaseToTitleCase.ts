export function camelCaseToTitleCase(field: string): string {
  return (
    field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
  );
}
