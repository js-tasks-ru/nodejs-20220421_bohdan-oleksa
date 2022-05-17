module.exports = class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(obj) {
    const errors = [];

    for (const field of Object.keys(this.rules)) {
      const rules = this.rules[field];

      const value = obj[field];
      const type = typeof value;

      if (type !== rules.type) {
<<<<<<< HEAD
        errors.push({ field, error: `expect ${rules.type}, got ${type}` });
=======
        errors.push({field, error: `expect ${rules.type}, got ${type}`});
>>>>>>> 008e01563503aea7568663b3140087544378d164
        continue;
      }

      switch (type) {
        case 'string':
          if (value.length < rules.min) {
            errors.push({ field, error: `too short, expect ${rules.min}, got ${value.length}` });
          }
          if (value.length > rules.max) {
            errors.push({ field, error: `too long, expect ${rules.max}, got ${value.length}` });
          }
          break;
        case 'number':
          if (value < rules.min) {
            errors.push({ field, error: `too small, expect ${rules.min}, got ${value}` });
          }
          if (value > rules.max) {
<<<<<<< HEAD
            errors.push({ field, error: `too big, expect ${rules.max}, got ${value}` });
=======
            errors.push({field, error: `too big, expect ${rules.max}, got ${value}`});
>>>>>>> 008e01563503aea7568663b3140087544378d164
          }
          break;
      }
    }

    return errors;
  }
};
