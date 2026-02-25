import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(cx(inputs));
}
