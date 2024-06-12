import { FastifyReply } from "fastify";

interface ResponseJSONParams<T> {
  data: T;
  message?: string;
  status?: number;
  error?: any;
  res: FastifyReply;
}

export default function ResponseJSON<T>({ data, message, status = 200, error, res }: ResponseJSONParams<T>) {
  const result = {
    data,
    message,
    error,
  };

  return res.status(status).send(result);
}
