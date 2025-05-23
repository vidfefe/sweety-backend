import cloudinary from "../cloudinary.js";

class File {
  async save(file) {
    if (!file) return null;

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        })
        .end(file.data);
    });
  }
  async delete(fileUrl) {
    if (!fileUrl) return;

    try {
      const parts = fileUrl.split("/");
      const fileName = parts.at(-1);
      const publicId = `products/${fileName.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new File();
