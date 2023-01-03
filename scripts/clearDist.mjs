import fsPromise from "node:fs/promises";

(async function () {
  try {
    await fsPromise.stat("./dist");
    fsPromise.rm("./dist", { force: true, recursive: true });
  } catch (e) {}
})();
