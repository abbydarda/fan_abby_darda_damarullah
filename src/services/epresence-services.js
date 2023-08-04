const dayjs = require('dayjs');
const { epresenceInsertValidation, epresenceUpdateValidation } = require('../validations/schema/epresence-validations');
const { insertEpresence, updateEpresence, findIdEpresence } = require('../repositories/epresence-repositories');
const { validate } = require('../validations/validate');
const { ResponseError } = require('../errors/response-errors');
const { findIdUser } = require('../repositories/user-repositories');

exports.insertEpresenceService = async (idUsers, request) => {
 request.id_users = idUsers;

 request = validate(epresenceInsertValidation, request);

 request.waktu = dayjs(request.waktu, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY HH.mm');

 const result = await insertEpresence(request);

 return { id: result.id };
};

exports.approvedEpresenceService = async (idEpresence, nppSupervisor) => {
 const isEpresenceExists = await findIdEpresence(idEpresence);

 if (!isEpresenceExists) throw new ResponseError(404, 'Data tidak ditemukan');

 const user = await findIdUser(isEpresenceExists.id_users);

 const isOwnEmployee = nppSupervisor === user.npp_supervisor;

 if (!isOwnEmployee) throw new ResponseError(403, 'Tidak punya akses');

 const request = validate(epresenceUpdateValidation, { is_approve: true });

 await updateEpresence(idEpresence, request);

 return { id: isEpresenceExists.id };
};
