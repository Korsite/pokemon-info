import {ImageNotFound} from "../assets/index.js";

export const checkIfImageIsAvailable = (image) => {
    if(image === null) {
        return ImageNotFound;
    }else{
        return image;
    }
}