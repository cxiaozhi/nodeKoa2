const path = require("path");

const {fileUploadError} = require("@/constant/err.type");
class GoodsController {
    async upload(ctx, next) {
        const {file} = ctx.request.files;
        if (file) {
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
