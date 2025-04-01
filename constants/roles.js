const Roles = Object.freeze({
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  SUPERADMIN: "superadmin",
});

const roleLevels = {
  student: 1,
  teacher: 2,
  admin: 3,
  superadmin: 4,
};

module.exports = { Roles, roleLevels };
