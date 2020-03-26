describe('declaring variables in typescript', () => {
    describe('typing', () => {
        it('implicitly typed variables', () => {
            let name = 'Joe';
            name = 'Ray';
        });

        it('explicitly typed variables', () => {
            let name: string;

            name = 'Sue';
        });
        it('union types', () => {
            let thingy: string | number | string[] = 'Tacos';

            thingy = 'Enchiladas';

            thingy = 42;

            thingy = ['Tacos', 'Enchliadas'];
        });
        it('type aliases', () => {
            type ThingsWithLettersAndStuff = string;
            const name: ThingsWithLettersAndStuff = 'Joe';
            type MathOperation = (a: number, b: number) => number;
            const add: MathOperation = (a, b) => a + b;

            expect(add(2, 2)).toBe(4);

            const subtract: MathOperation = function (a: number, b: number) {
                return a - b;
            };

        });
    });
});
