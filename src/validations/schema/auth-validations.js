const joi = require('joi');

exports.authLoginValidation = joi.object({
 email: joi.string().email().empty().required().messages({
  'string.base': 'Email harus berupa string',
  'string.email': 'Format email tidak valid',
  'string.empty': 'Email tidak boleh kosong',
  'any.required': 'Email harus diisi',
 }),

 password: joi.string().empty().min(8).max(100).required().messages({
  'string.base': 'Password harus berupa string',
  'string.empty': 'Password tidak boleh kosong',
  'string.min': 'Password minimal terdiri dari 8 karakter',
  'string.max': 'Password maksimal terdiri dari 100 karakter',
  'any.required': 'Password harus diisi',
 }),
});
