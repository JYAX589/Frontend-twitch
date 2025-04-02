export const validationAvatarUrl = ()=>{
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export const avatarUrlValidationMessage = 'Esta no es una URL valida';