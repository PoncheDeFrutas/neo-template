export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // Remove data URL prefix if present (e.g., data:image/png;base64,)
            const commaIndex = result.indexOf(',');
            resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

export async function toFileObject(file: File) {
    const data = await fileToBase64(file);
    return {
        filename: file.name,
        mimeType: file.type,
        data,
    } as const;
}
