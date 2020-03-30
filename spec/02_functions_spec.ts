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
        describe('scalar array methods', () => {
            describe('testing membership', () => {
                it('can see if every element of an array matches a criteria', () => {
                    const allEven = numbers.every(isEven); // C# linq - 'all'
                    expect(allEven).toBe(false);
                });
                it('can see if any element in an array matches a criteria', () => {
                    const anyEven = numbers.some(isEven); // C# linq - 'any'
                    expect(anyEven).toBe(true);
                });

            });
            describe('using reduce', () => {
                it('boiling down a list of things to a single value', () => {
                    const total = numbers.reduce((s, n) => s + n);
                    expect(total).toBe(45);

                    const total2 = numbers.reduce((s, n) => s + n, 100);
                    expect(total2).toBe(145);
                });
            });
        });
        describe('practice', () => {
            interface CartItem {
                name: string;
                qty: number;
                price: number;
            }

            const cart: CartItem[] = [
                { name: 'Eggs', qty: 1, price: 2.99 },
                { name: 'Bread', qty: 3, price: 3.57 },
                { name: 'Shampoo', qty: 2, price: 7.25 }
            ];

            interface ShippingInfo {
                totalQty: number;
                totalPrice: number;
            }

            it('can you calculate the shipping info for the cart?', () => {
                // const shippingInfo: ShippingInfo = {
                //     totalQty: cart.reduce((s, n) => s.qty + n.qty),
                //     totalPrice: cart.reduce((s, n) => (s.price * s.qty) + (n.price * n.qty))
                // };

                const initialState: ShippingInfo = {
                    totalPrice: 0,
                    totalQty: 0
                };

                const shippingInfo: ShippingInfo = cart.reduce((state: ShippingInfo, cartItem: CartItem) => {
                    return {
                        totalQty: state.totalQty + cartItem.qty,
                        totalPrice: state.totalPrice + (cartItem.qty * cartItem.price)
                    };
                }, initialState);

                expect(shippingInfo.totalPrice).toBe((1 * 2.99) + (3 * 3.57) + (2 * 7.25));
                expect(shippingInfo.totalQty).toBe(6);

            });
        });
        describe('another practice', () => {
            interface BowlingGame {
                playerName: string;
                score: number;
            }

            const scores: BowlingGame[] = [
                { playerName: 'Jeff', score: 127 },
                { playerName: 'Henry', score: 227 },
                { playerName: 'Violet', score: 118 }
            ];

            it('practice', () => {
                // figure out who has the highest score, who has the lowest score, and what the highest and lowest score are
                // there are not ties, we dont believe in that, dont worry about it
                // 1) design an interface that is what you want the result to be
                // 2) set the intial state as above

                interface Results {
                    highScorer: BowlingGame;
                    lowScorer: BowlingGame;

                    // highScorer: string;
                    // highScore: number;
                    // lowScorer: string;
                    // lowScore: number;
                }

                const initialState: Results = {
                    highScorer: { playerName: null, score: -1 },
                    lowScorer: { playerName: null, score: 301 },

                    // highScorer: null,
                    // highScore: -1,
                    // lowScorer: null,
                    // lowScore: 301
                };

                const results: Results = scores.reduce((state: Results, next: BowlingGame) => {
                    return {
                        highScorer:
                        {
                            playerName: next.score > state.highScorer.score ? next.playerName : state.highScorer.playerName,
                            score: next.score > state.highScorer.score ? next.score : state.highScorer.score
                        },
                        lowScorer:
                        {
                            playerName: next.score < state.lowScorer.score ? next.playerName : state.lowScorer.playerName,
                            score: next.score < state.lowScorer.score ? next.score : state.lowScorer.score
                        }

                        // highScorer: next.score > state.highScore ? next.playerName : state.highScorer,
                        // highScore: next.score > state.highScore ? next.score : state.highScore,
                        // lowScorer: next.score < state.lowScore ? next.playerName : state.lowScorer,
                        // lowScore: next.score < state.lowScore ? next.score : state.lowScore
                    };
                }, initialState);
            });
        });
    });
});
