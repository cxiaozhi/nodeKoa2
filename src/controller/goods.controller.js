const path = require("path");
const fs = require("fs");
const {fileUploadError, fileFormatError} = require("@/constant/err.type");
class GoodsController {
    async upload(ctx, next) {
        const {file} = ctx.request.files;
        const fileTypes = ["image/jpeg", "image/png"];
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                console.error(
                    "不支持的文件类型,只支持image/jpeg,image/png格式文件"
                );
                fs.rmSync(
                    path.join(process.cwd(), "src/upload", file.newFilename)
                );
                return ctx.app.emit("error", fileFormatError, ctx);
            }
            ctx.body = {
                code: 0,
                message: "图片上传成功",
                result: {
                    goods_img: file.newFilename,
                },
            };
        } else {
            console.error("文件上传失败");
            return ctx.app.emit("error", fileUploadError, ctx);
        }
    }
}

module.exports = new GoodsController();
