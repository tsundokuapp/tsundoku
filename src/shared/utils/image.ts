/**
 * Valida se uma imagem é vertical (altura > largura)
 * @param file Arquivo de imagem a ser validado
 * @returns Promise que resolve true se a imagem for vertical
 */
export function validateVerticalImage(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('O arquivo não é uma imagem.'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img.height > img.width);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Erro ao carregar a imagem.'));
    };

    img.src = URL.createObjectURL(file);
  });
}

// Alias para compatibilidade com código legado
export const ValidateVerticalImage = validateVerticalImage;
