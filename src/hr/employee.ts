export class Employee {
    constructor(private salary: number, public firstName: string, public lastName: string) { }

    getSalary() {
        return this.salary;
    }

    get fullName(): string {
        return `${this.lastName}, ${this.firstName}`;
    }
}
