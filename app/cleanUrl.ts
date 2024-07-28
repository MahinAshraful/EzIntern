export default function cleanUrl(url:any) {
    
        // Remove the 'https://' prefix
        let cleanedUrl = url.replace('https://', '');
        cleanedUrl = cleanedUrl.replace('www.', '');
      
        // Find the position of the last dot in the domain portion
        const firstSlashIndex = cleanedUrl.indexOf('/');
        const domain = firstSlashIndex !== -1 ? cleanedUrl.substring(0, firstSlashIndex) : cleanedUrl;
        const lastDotIndex = domain.lastIndexOf('.');
      
        // Extract the portion of the string up to the last dot in the domain
        cleanedUrl = cleanedUrl.substring(0, lastDotIndex);
      
        return cleanedUrl;
}