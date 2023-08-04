const countKata = (sencentes) => {
 const pattern = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/]+/;
 return sencentes.split(' ').filter((item) => !pattern.test(item)).length;
};

console.log(countKata('Kemarin Shopia per[gi ke mall'), 4);
console.log(countKata('Saat meng*ecat tembok, Agung dib_antu oleh Raihan'), 5);
console.log(countKata('Berapa u(mur minimal[ untuk !mengurus ktp?'), 3);
console.log(countKata('Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda'), 4);
