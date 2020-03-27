import { add, applicationName } from './utils';

describe('declaring variables in typescript', () => {
    it('constant might not mean what you think it means', () => {

    });
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

        describe('literals', () => {
            describe('string literals', () => {
                it('has them', () => {
                    const message = 'She told me "You look nice today"';
                    const message2 = 'The Author was Flannery O\'Connor';

                    // tslint:disable-next-line: quotemark
                    const message3 = "The Author was Flannery O'Connor"; const message4 = "The Author was Flannery O'Connor";
                });
                it('has template strings', () => {
                    // tslint:disable-next-line: one-variable-per-declaration
                    const name = 'Joe', age = 28;
                    const message = `My name is ${name} and my age is ${age}`;
                    const message2 = 'My name is ' + name + ' and my age is ' + age;

                    expect(message).toEqual(message2);
                });
            });
        });

        describe('array literals and tuple types', () => {
            it('two ways to declare an array', () => {

                const numbers: (number | string)[] = [1, 2, 3, 4];
                numbers[0] = 'Tacos';
                const val = numbers[2];



                let numbers2: Array<number | string>;
            });

            it('has array destructuring', () => {
                const friends = ['Sean', 'Amy', 'David', 'Sarah'];

                const [f1, f2, , f3] = friends;

                expect(f1).toBe('Sean');
                expect(f2).toBe('Amy');
                expect(f3).toBe('Sarah');

                const [first, ...allTheOthers] = friends; // ... is "the rest" (rest operator)
                expect(first).toBe('Sean');
                expect(allTheOthers).toEqual(['Amy', 'David', 'Sarah']);
            });
            it('using immutable techniques to change arrays', () => {
                const friends = ['Sean', 'Amy', 'David', 'Sarah'];
                const friends2 = ['Henry', ...friends]; // ... 'the spread operator'

                expect(friends2).toEqual(['Henry', 'Sean', 'Amy', 'David', 'Sarah']);
            });
            describe('a practical example of a tuple', () => {
                interface FormatNameResult { formattedName: string; numberOfLetters: number; }

                function formatName(first: string, last: string): FormatNameResult {
                    const name = `${last}, ${first}`;
                    return {
                        formattedName: name,
                        numberOfLetters: name.length
                    };


                }
                const result = formatName('Han', 'Solo');
                expect(result.formattedName).toBe('Solo, Han');
                expect(result.numberOfLetters).toBe(9);

                const { formattedName, numberOfLetters: letters } = formatName('Han', 'Solo');
                expect(formattedName).toBe('Solo, Han');
                expect(letters).toBe(9);
            });
            it('same thing but with tuples', () => {
                function formatName2(first: string, last: string): [string, number] {
                    const name = `${last}, ${first}`;
                    return [name, name.length];
                }
                const [n, l] = formatName2('Han', 'Solo');
                expect(n).toBe('Solo, Han');
                expect(l).toBe(9);
            });

            it('tuple syntax example', () => {
                type Musician = [string, string, number, string];

                const nick: Musician = ['Nick', 'Cave', 63, 'Singer'];
                const warren: Musician = ['Warren', 'Ellis', 58, 'Violin'];

                expect(warren[2]).toBe(58);
            });

        });


    });

    describe('object literals and interfaces', () => {
        it('anonymous objects are defined by an interface', () => {
            const thor = {
                title: 'Thor: Ragnarok',
                director: 'Taika Waititi',
                yearReleased: 2017
            };

            const updatedThor = { ...thor, yearReleased: 2018 };
            expect(updatedThor.title).toBe('Thor: Ragnarok');
            expect(updatedThor.yearReleased).toBe(2018);
            expect(thor.yearReleased).toBe(2017);
        });

        it('extensible objects', () => {
            interface Book {
                title: string;
                author: string;
                pages: number;
                publisher?: string; // optional parameter
                year: number | null;
            }

            const book: Book = {
                title: 'Walden',
                author: 'Thoreau',
                pages: 219,
                year: null
            };

            book.publisher = '';

            function doBookStuff(someBook: Book) {
                if (!someBook.publisher) {

                }
            }
        });

        it('truth table', () => {
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
            expect(0).toBeFalsy();
            expect('').toBeFalsy();
            expect(1).toBeTruthy();
            expect(-1).toBeTruthy();
            expect(NaN).toBeFalsy();
            expect('penguin').toBeTruthy();
        });
        it('an example', () => {
            interface IHaveAMessage { message: string; }
            function logItOut(thingy: IHaveAMessage) {
                console.log(`At ${new Date().toISOString()}: ${thingy.message}`);
            }
            // logItOut();
            // logItOut('tacos');
            logItOut({ message: 'Hello' });
            const phoneCall = {
                from: 'Mom',
                line: 'Home Phone',
                message: 'Call your mom'
            };

            logItOut(phoneCall);
        });

    });

    describe('enums and string unions', () => {
        it('asssinging seats', () => {
            type SeatType = 'aisle' | 'window' | 'middle';

            let mySeat: SeatType;

            mySeat = (() => 'window' as SeatType)();
            let price = 0;

            switch (mySeat) {
                case 'aisle': {
                    price = 100;
                    return;
                }
                case 'middle': {
                    price = 75;
                    return;
                }
                case 'window': {
                    price = 125;
                    return;
                }
            }

            expect(price).toBe(125);
            type FileType = 'xml' | 'json' | 'jsonp' | 'text';
            const theFile: FileType = 'jsonp';
            enum AccountType { Standard, Gold = 99, Platinum }
            const myAcccount: AccountType = AccountType.Gold;
        });
    });

});
