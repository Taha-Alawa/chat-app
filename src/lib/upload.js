import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebas";

const upload = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        const errorMessage = error.code ? `Something went wrong! ${error.code}` : "An unknown error occurred during upload.";
        reject(errorMessage);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;