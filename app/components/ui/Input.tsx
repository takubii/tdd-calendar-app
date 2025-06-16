import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  type?: 'text' | 'email' | 'password' | 'date' | 'time';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    className,
    ...props
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange?.(e.target.value);
      }
    };

        const baseClasses = [
      'w-full',
      'px-3',
      'py-2',
      'border',
      'rounded-md',
      'focus:outline-none',
      'focus:ring-2',
      'transition-colors'
    ].join(' ');

    const stateClasses = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-50'
      : 'bg-white hover:border-gray-400';

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            baseClasses,
            stateClasses,
            disabledClasses,
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';