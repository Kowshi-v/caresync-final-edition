import { PinataSDK } from "pinata-web3";

export const usePinataHook = () => {
    const pinata = new PinataSDK({
        pinataJwt: process.env.NEXT_PUBLIC_JWT,
    });

    const IpfsUpload = async (file: File) => {
        try {
            const upload = await pinata.upload.file(file);
            return upload;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        IpfsUpload,
    }
}