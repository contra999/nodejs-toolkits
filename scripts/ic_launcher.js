/**
 * 根据图标文件自动生成安卓的启动图标文件夹
 */

const fs = require("fs");
const path = require("path");

const { targetDir } = require("../config.js");

/**
 * mipmap-mdpi 48*48
 * mipmap-hdpi 72*72
 * mipmap-xhdpi 96*96
 * mipmap-xxhdpi 144*144
 */
const folders = ["mipmap-mdpi", "mipmap-hdpi", "mipmap-xhdpi", "mipmap-xxhdpi"];
const filename = "ic_launcher.png";

// 按图标大小升序排序
const files = fs
  .readdirSync(targetDir)
  .map(file => {
    const stat = fs.statSync(path.resolve(targetDir, file));
    return {
      file,
      extname: path.extname(file),
      isDirectory: stat.isDirectory(),
      size: stat.size
      // ...stat
    };
  })
  .filter(item => !item.isDirectory && item.extname === ".png")
  .sort((a, b) => a.size - b.size);
console.log(files);

// 创建文件夹
folders.forEach((dirname, index) => {
  const pathname = path.join(targetDir, dirname);
  // console.log(pathname);
  if (fs.existsSync(pathname)) {
    console.log(`文件夹${dirname}已经存在`);
  } else {
    fs.mkdirSync(pathname);
    console.log(`文件夹${dirname}创建成功`);
  }

  // 将升序排列的图标移动到文件夹中并重命名
  if (files[index]) {
    const sourceFile = path.join(targetDir, files[index].file);
    const destPath = path.join(targetDir, dirname, filename);
    fs.rename(sourceFile, destPath, err => {
      if (err) throw err;
      console.log(dirname + " done!");
    });
  }
});
