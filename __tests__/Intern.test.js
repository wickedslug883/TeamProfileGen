const Intern = require("../lib/Intern");
  
test("employeeOBJ Int", () => {
    const intern = new Intern('Name', 2, 'a@fakemail.com', 'UTA');
    expect(intern.school) .toEqual(expect.any(String));
});

test("Can we get intern school", () => {
    const intern = new Intern('Name', 2, 'a@fakemail.com', 'UTA');
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test("employee role", () => {
    const intern = new Intern('Name', 2, 'a@fakemail.com', 'UTA');
    expect(intern.getRole()).toEqual("Intern");
}); 