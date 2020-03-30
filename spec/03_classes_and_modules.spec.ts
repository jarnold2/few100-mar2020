import { Employee } from '../src/hr/employee';
import { VacationRequest } from '../src/hr/vacation-request';

describe('using classes', () => {
    describe('creating instances', () => {
        it('using constructors', () => {
            const bob = new Employee(64_000, 'Robert', 'Jones');

            expect(bob.getSalary()).toBe(64_000);
            expect(bob.firstName).toBe('Robert');
            expect(bob.lastName).toBe('Jones');

            const vacation = new VacationRequest(bob);
            expect(vacation.employee.firstName).toBe('Robert');
        });
    });
});
