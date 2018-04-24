/**
 * 删除指定目录下的所有文件及文件夹
 */

const fs = require("fs");
const path = require("path");

const { targetDir } = require("../config.js");

deleteFolder(targetDir);
createFolder(targetDir);

// 递归删除非空文件夹 或者使用 fs-extra 模块 removeSync
function deleteFolder(pathname) {
  if (fs.existsSync(pathname)) {
    const files = fs.readdirSync(pathname);
    files.forEach(filename => {
      const currentPath = path.resolve(pathname, filename);
      if (fs.statSync(currentPath).isDirectory()) {
        deleteFolder(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(pathname);
  }
}

function createFolder(pathname) {
  fs.mkdir(pathname, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("清空完毕");
    }
  });
}
