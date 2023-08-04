# PT. FAN Integrasi Teknologi - Abby Darda Damarullah

![Node.js Version](https://img.shields.io/badge/Node.js-v18.16.0-green)
![Express Version](https://img.shields.io/badge/Express-4.18.2-blue)

Ini adalah API untuk test backend developer PT. FAN Integrasi Teknologi.

## Case Logika

Untuk case logika ada di dalam folder logika

## Dokumentasi

Dokumentasi API dapat diakses melalui Swagger UI yang berjalan pada endpoint `/api/docs`.

## Instalasi

1. Clone repositori ini ke direktori lokal Anda:

   ```bash
   git clone git@github.com:abbydarda/fan_abby_darda_damarullah.git
   ```

2. Masuk ke direktori proyek:

   ```bash
   cd fan_abby_darda_damarullah
   ```

3. Buat file `.env` dan isi dengan konfigurasi yang sesuai:

   ```bash
   touch .env
   ```

Contoh isi file `.env`:

```env
 APP_PORT=3001
 DB_URI=postgres://user:password@localhost:5432/db_name
 DB_DIALECT=postgres
 JWT_SECRET=super-secret
 JWT_EXP=1d
```

4. Buat file `.env.development` dan `.env.testing` untuk tahap development dan test, dan isi dengan konfigurasi yang sesuai.

Contoh isi file `.env.development`:

```env
APP_PORT=3001
DB_URI=postgres://user:password@localhost:5432/db_name_dev
DB_DIALECT=postgres
JWT_SECRET=super-secret
JWT_EXP=1d
```

Contoh isi file `.env.testing`:

```env
APP_PORT=3001
DB_URI=postgres://user:password@localhost:5432/db_name_test
DB_DIALECT=postgres
JWT_SECRET=super-secret
JWT_EXP=1d

```

5. Install dependensi yang diperlukan:

   ```bash
   npm install
   ```

````

6. jalankan migrasi:

```bash
NODE_ENV=development npm run migrate:up //untuk stage development
NODE_ENV=production npm run migrate:up //untuk stage production
NODE_ENV=development npm run migrate:undo //untuk stage development
NODE_ENV=production npm run migrate:undo //untuk stage production
```

7. jalankan seeder
```bash
NODE_ENV=development npm run seed:all //untuk stage development
NODE_ENV=production npm run seed:undo:all //untuk stage production
```

## Menjalankan Aplikasi

### Tahap Production

1. Jalankan aplikasi dalam mode development:

   ```bash
   npm run start
   ```

   Aplikasi akan berjalan di `http://localhost:3001`.

### Tahap Development

1. Jalankan aplikasi dalam mode development:

   ```bash
   npm run start:dev
   ```

   Aplikasi akan berjalan di `http://localhost:3001`.

### Tahap Testing

1. Jalankan perintah berikut untuk menjalankan unit test:

   ```bash
   npm test
   ```

   Unit test akan dieksekusi dan hasilnya akan ditampilkan di konsol.
````
