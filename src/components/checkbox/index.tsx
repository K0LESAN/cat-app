import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { useId } from 'react';

export interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, ...inputProps }) => {
  const id = useId();

  return (
    <div>
      <input {...inputProps} id={id} type='checkbox' />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
