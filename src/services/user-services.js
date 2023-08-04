const dayjs = require('dayjs');
const { findUser } = require('../repositories/user-repositories');

exports.findUserService = async () => {
 const users = await findUser();

 const groupedData = {};

 for (const user of users) {
  const epresences = user.Epresences;

  for (const epresence of epresences) {
   const [date, time] = epresence.waktu.split(' ');
   const parseDate = dayjs(date, 'DD/MM/YY').format('YYYY-MM-DD');
   const parseTime = dayjs(time, 'HH.mm').format('HH:mm:ss');
   const status = epresence.is_approve ? 'APPROVE' : 'REJECT';

   if (!groupedData[parseDate]) {
    groupedData[parseDate] = {
     id_user: user.id,
     nama_user: user.nama,
     tanggal: parseDate,
     waktu_masuk: '',
     waktu_pulang: '',
     status_masuk: '',
     status_pulang: '',
    };
   }

   const userData = groupedData[parseDate];

   if (epresence.type === 'IN') {
    userData.waktu_masuk = parseTime;
    userData.status_masuk = status;
   }

   if (epresence.type === 'OUT') {
    userData.waktu_pulang = parseTime;
    userData.status_pulang = status;
   }
  }
 }

 const result = Object.values(groupedData);

 return result;
};
