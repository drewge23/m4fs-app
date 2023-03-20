import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

const handlePhotoChange = (e, setUserPicUrl, userId) => {
    const storage = getStorage()
    const photoRef = ref(storage, `users/${userId}`)

    uploadBytes(photoRef, e.target.files[0])
        .then((snapshot) => {
            getDownloadURL(photoRef)
                .then((url) => {
                    setUserPicUrl(url)
                })
        })
        .catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                default:
                    alert('Something went wrong')
            }
        });
}

export default handlePhotoChange