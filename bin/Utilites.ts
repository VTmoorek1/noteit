enum Media {
    image='image',
    video='video',
    audio='audio',
    none='none'
}

export default {

    getFileType: (fileType : string) : Media => {

        let type : Media = Media.none;

        if (fileType !== null) {

            // First check the prefix before the /
            let sIndex = fileType.indexOf('/');
            let suffix,typeStr = '';

            if (sIndex > -1) {
                typeStr = fileType.slice(0, sIndex);
                suffix = fileType.substr(sIndex);
                console.log(typeStr);
            }

            // If no type has been determined then try the file endings
            // otherwise return null
            if (typeStr !== 'audio' && typeStr !== 'video' &&
                typeStr !== 'image') {

                switch(suffix)
                {
                    case 'mp4':
                    case 'webm':
                    case 'ogg':
                        type = Media.video;
                        break;
                    case 'mp3':
                    case 'wav':
                        type = Media.audio;
                        break;
                    case 'png':
                    case 'bmp':
                    case 'gif':
                    case 'x-icon':
                    case 'jpeg':
                    case 'svg+xml':
                    case 'tiff':
                    case 'webp':
                        type = Media.image;
                        break;
                }
            }
        }

        return type;
    },
    base64ToArrayBuffer : (base64 : string) : ArrayBuffer => {
        
        let binaryString =  window.atob(base64);
        let length = binaryString.length;
        let bytes = new Uint8Array(length);

        for (let i = 0; i < length; i++)   {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return bytes.buffer;
    },
    Media : Media
};