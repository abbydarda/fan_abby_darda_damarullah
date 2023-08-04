const joi = require('joi');

const timeFormatRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;

exports.epresenceInsertValidation = joi.object({
 id_users: joi.number().positive().messages({
  'number.positive': 'ID Epresence harus berupa nomor positif',
 }),

 type: joi.valid('IN', 'OUT').required().messages({
  'any.required': 'Type harus diisi',
  'any.only': 'Type hanya boleh IN|OUT',
 }),

 waktu: joi.string().regex(timeFormatRegex).empty().required().messages({
  'any.required': 'Waktu harus diisi',
  'string.empty': 'Waktu tidak boleh kosong',
  'string.pattern.base': 'Format waktu tidak valid (YYYY-MM-DD HH:mm:ss)',
 }),
});

exports.epresenceUpdateValidation = joi.object({
 id_user: joi.number().positive().messages({
  'number.positive': 'ID Epresence harus berupa nomor positif',
 }),

 type: joi.valid('IN', 'OUT').messages({
  'any.only': 'Type hanya boleh IN|OUT',
 }),

 is_approve: joi.boolean().messages({
  'boolean.base': 'Is Approve hanya boleh TRUE|FALSE',
 }),

 waktu: joi.string().regex(timeFormatRegex).empty().messages({
  'any.required': 'Waktu harus diisi',
  'string.empty': 'Waktu tidak boleh kosong',
  'string.pattern.base': 'Format waktu tidak valid (YYYY-MM-DD HH:mm:ss)',
 }),
});
