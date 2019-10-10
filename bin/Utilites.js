module.exports = {

    getFileType: (fileType) => {

        let typeStr = null;

        if (fileType !== null) {

            // First check the prefix before the /
            let sIndex = fileType.indexOf('/');
            let suffix = '';

            if (sIndex > -1) {
                typeStr = fileType.slice(0, sIndex);
                suffix = fileType.substr(sIndex);
                console.log(typeStr);
            }

            // If no type has been determined then try the file endings
            // otherwise return null
            if (typeStr !== 'audio' && typeStr !== 'video' &&
                typeStr !== 'image') {

                typeStr = null;

                switch(suffix)
                {
                    case 'mp4':
                    case 'webm':
                    case 'ogg':
                        typeStr = 'video';
                        break;
                    case 'mp3':
                    case 'wav':
                        typeStr = 'audio';
                        break;
                    case 'png':
                    case 'bmp':
                    case 'gif':
                    case 'x-icon':
                    case 'jpeg':
                    case 'svg+xml':
                    case 'tiff':
                    case 'webp':    
                        typeStr = 'image'
                        break;
                }
            }
        }

        return typeStr;
    }
};