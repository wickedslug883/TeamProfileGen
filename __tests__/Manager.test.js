const Manager = require('../lib/Manager');

test("employeeOBJ Man", () => {
    const manager = new Manager('Name', 2, 'a@fakemail.com', 1234);
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("office number", () => {
    const manager = new Manager('Name', 2, 'a@fakemail.com', 4321);
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("employee role", () => {
    const manager = new Manager('Name', 2, 'a@fakemail.com');
    expect(manager.getRole()).toEqual("Manager");
}); 