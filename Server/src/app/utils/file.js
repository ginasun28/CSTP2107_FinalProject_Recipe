const path = require('path')
const mkdirp = require('mkdirp')
const sd = require("silly-datetime")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // 1. get current date
        let day = sd.format(new Date(), "YYYYMMDD")

        // 2. splice directory
        let dir = path.join("./public/uploads", day)

        // 3. Generate image storage directory according to date mkdirp is an asynchronous method
        await mkdirp.mkdirp(dir)

        cb(null, dir)
    },
    filename: function (req, file, cb) {
        // 1. Get the file extension
        let extName = path.extname(file.originalname)
        // 2. Generate filenames based on timestamps
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + extName)
    }
})
const upload = multer({storage: storage})

module.exports = upload
