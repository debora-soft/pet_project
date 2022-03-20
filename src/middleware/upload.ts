import multer from "multer";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const data = v4();
    cb(null, `${data}.${file.mimetype.split('/')[1]}`);
  },
});


export const upl =  multer({
  storage
}) 