import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  helperText?: string;
  label?: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}
const classes = {
  root: 'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body  placeholder-body min-h-12 transition duration-200 ease-in-out',
  normal:
    'bg-gray-100 border-gray-300 focus:shadow focus:bg-white focus:border-skin-primary',
  solid:
    'bg-white border-skin-base focus:outline-none h-11 md:h-12 focus:border-skin-primary',
  outline: 'border-gray-300 focus:outline-none focus:border-skin-primary',
  shadow: 'focus:shadow',
};
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = 'block',
      label,
      name,
      error,
      placeholder,
      helperText,
      variant = 'normal',
      shadow = false,
      type = 'text',
      inputClassName,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline',
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );
    return (
      <div className={className}>
        <div className="flex items-center justify-between ">
          {label && (
            <label
              htmlFor={name}
              className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
            >
              {label}
            </label>
          )}

          {helperText && (
            <p className="text-xs text-pink-700 transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover">
              {helperText}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            // @ts-ignore
            placeholder={placeholder}
            className={rootClassName}
            autoComplete="off"
            spellCheck="false"
            aria-invalid={error ? 'true' : 'false'}
            {...rest}
          />
        </div>
        {error && <p className="my-2 text-13px text-skin-red">{error}</p>}
      </div>
    );
  }
);

export default Input;
