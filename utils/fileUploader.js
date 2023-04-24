import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
    },
});

const fileFilter = (req, file, cb) =>
    file.mimetype.split("/")[1].match(/^(png|jpeg|jpg)$/gi)
        ? cb(null, true)
        : 
        cb(new Error("please upload only jpeg/jpg/png files"), false);

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;