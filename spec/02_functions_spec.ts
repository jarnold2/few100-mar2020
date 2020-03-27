import { isEven } from './utils';

describe('functions', () => {
    describe('declaring them', () => {
        it('has two kinds and 3 ways to create them', () => {
            // named function
            function add(a: number, b: number) {
                return a + b;
            }

            // anonymous function
            const subtract = function (a: number, b: number) {
                return a - b;
            };

            const multiply = (a: number, b: number) => a * b;

            function doMath(a: number, b: number, f: (a: number, b: number) => number) {
                return f(a, b);
            }

            expect(doMath(2, 2, add)).toBe(4);
            expect(doMath(2, 2, subtract)).toBe(0);
            expect(doMath(2, 5, multiply)).toBe(10);
        });
    });
    describe('arguments to function', () => {
        it('optional default arguments', () => {
            function add(a: number = 10, b: number = 5, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((s, n) => s + n, firstTwo);
            }

            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);

            function addThemAll(...rest: number[]) {
                return rest.reduce((s, n) => s + n);
            }

            expect(addThemAll(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
    });
    describe('array method', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        it('visiting each member of an array', () => {
            numbers.forEach((v, i, n) => console.log({ v, i, n }));
        });
        describe('methods that create a new array', () => {
            it('has a filter', () => {
                const evens = numbers.filter(isEven);
                expect(evens).toEqual([2, 4, 6, 8]);
                expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
            it('transforming each one', () => {
                const doubled = numbers.map(n => n * 2);
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
            });
        });
    });
});
