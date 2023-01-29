import imageCompression from "browser-image-compression";

export async function handleImageUpload(event) {
  const imageFile = event.target.files[0];
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 2560,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    // await uploadToServer(compressedFile); // write your own logic

    // From supabase:

    // Upload an image to the "avatars" bucket
    // const spaceCat = event.target.files[0];
    // const { data, error } = await supabase.storage
    //   .from("avatars")
    //   .upload("space-cat.png", spaceCat);

    // Download the "space-cat.png" image from the "avatars" bucket
    // const { data, error } = await supabase.storage.from("avatars").download("space-cat.png");
  } catch (error) {
    console.log(error);
  }
}
