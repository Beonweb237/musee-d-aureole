import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'outline-light' | 'ghost' | 'pill';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#C9A96E] text-[#0A0A0A] hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] border-transparent',
  secondary:
    'bg-transparent text-[#C9A96E] border-[#C9A96E] hover:bg-[rgba(201,169,110,0.1)]',
  dark: 'bg-[#0A0A0A] text-[#F7F5F0] hover:bg-[#1A1A1A] border-transparent',
  'outline-light':
    'bg-transparent text-[#F7F5F0] border-[rgba(255,255,255,0.4)] hover:border-white hover:bg-[rgba(255,255,255,0.06)]',
  ghost:
    'bg-transparent text-[var(--text-primary)] border-transparent hover:bg-[rgba(10,10,10,0.04)]',
  pill: 'bg-[#C9A96E] text-[#0A0A0A] hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] border-transparent rounded-full',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      isLoading = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 rounded-sm border',
      variantClasses[variant],
      sizeClasses[size],
      isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer',
      className,
    ].join(' ');

    if (props.href !== undefined) {
      const { href, ...rest } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...rest}
        >
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </a>
      );
    }

    const { type, disabled, ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type={type || 'button'}
        disabled={disabled || isLoading}
        className={classes}
        {...rest}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
