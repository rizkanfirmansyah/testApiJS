interface ResponseJSONParams<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export default function ResponseJSON<T>({ data, message, success = true }: ResponseJSONParams<T>) {
  const result = {
    data,
    message,
    success: success ?? true,
  };
  return result;
}
