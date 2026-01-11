export function objectToFormData(
  obj: Record<string, any>,
  form?: FormData,
  namespace?: string,
): FormData {
  const fd = form || new FormData();

  for (const property in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, property) || obj[property] === undefined)
      continue;

    const formKey = namespace ? `${namespace}.${property}` : property;
    const value = obj[property];

    // File
    if (value instanceof File) {
      fd.append(formKey, value);
    }
    // Array
    else if (Array.isArray(value)) {
      value.forEach((v: any, index: number) => {
        const nestedKey = `${formKey}[${index}]`;

        if (v instanceof File) {
          fd.append(formKey, v);
        } else if (typeof v === "object") {
          objectToFormData(v, fd, nestedKey);
        } else {
          fd.append(nestedKey, v);
        }
      });
    }
    // Object
    else if (value !== null && typeof value === "object") {
      objectToFormData(value, fd, formKey);
    }
    // Primitive
    else {
      fd.append(formKey, value);
    }
  }

  return fd;
}
