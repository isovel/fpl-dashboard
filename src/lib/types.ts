export type OnChangeFcn<T> = (
  value: T
) => void | React.Dispatch<React.SetStateAction<T>>
