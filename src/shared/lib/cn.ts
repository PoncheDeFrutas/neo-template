type ClassValue = string | number | null | false | undefined | ClassDictionary | ClassArray;

type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassArray = ClassValue[];

/**
 * Minimal classnames/clsx clone to compose Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
    const classes: string[] = [];
    for (const input of inputs) {
        if (!input) continue;
        if (typeof input === 'string' || typeof input === 'number') {
            classes.push(String(input));
            continue;
        }
        if (Array.isArray(input)) {
            const inner = cn(...input);
            if (inner) classes.push(inner);
            continue;
        }
        if (typeof input === 'object') {
            for (const key in input) {
                if (Object.prototype.hasOwnProperty.call(input, key) && input[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}
