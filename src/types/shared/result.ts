export interface Result<T> {
  value?: T;
  exception?: string;
  isSuccess: boolean;
  isFailure: boolean;
  isNull: boolean;
}
