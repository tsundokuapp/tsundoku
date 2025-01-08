export const ValidateVerticalImage = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('O arquivo não é uma imagem.');
      return;
    }

    const img = new Image();
    img.onload = () => {
      resolve(img.height > img.width);
    };
    img.onerror = () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Erro ao carregar a imagem.');
    };

    img.src = URL.createObjectURL(file);
  });
};
