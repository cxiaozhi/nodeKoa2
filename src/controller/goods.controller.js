const path = require("path");
const fs = require("fs");
const {
    fileUploadError,
    fileFormatError,
    releaseGoodsError,
    updateGoodsError,
} = require("@/constant/err.type");

const {createGoods, updateGoodsService} = require("@/service/goods.service");
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

    // 发布商品
    async releaseGoods(ctx) {
        try {
            const res = await createGoods(ctx.request.body);
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "发布商品成功",
                    result: "",
                };
            } else {
                return ctx.app.emit("error", releaseGoodsError, ctx);
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit("error", releaseGoodsError, ctx);
        }
    }

    // 修改商品
    async updateGoods(ctx) {
        try {
            const res = await updateGoodsService(
                ctx.params.id,
                ctx.request.body
            );
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "修改商品成功",
                    result: "",
                };
            } else {
                console.error("修改商品失败");
                return ctx.app.emit("error", updateGoodsError, ctx);
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit("error", updateGoodsError, ctx);
        }
    }
}

module.exports = new GoodsController();
