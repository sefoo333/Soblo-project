// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dj2rasyos",
  api_key: "361494132586791",
  api_secret: "ZA1KfwUQOPSK-4cFb7Up8qNyDHw",
  secure: true,
});

export default cloudinary;
