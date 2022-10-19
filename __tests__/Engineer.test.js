const Engineer = require("../lib/Engineer");

test("employeeOBJ Eng", () => {
    const engineer = new Engineer('Name', 2, 'a@fakemail.com', 'GitHub');
    expect(engineer.github) .toEqual(expect.any(String));
});

test("github", () => {
    const engineer = new Engineer('Name', 2, 'a@fakemail.com', 'GitHub');
    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

test("employee role", () => {
    const engineer = new Engineer('Name', 2, 'a@fakemail.com', 'GitHub');
    expect(engineer.getRole()).toEqual("Engineer");
});