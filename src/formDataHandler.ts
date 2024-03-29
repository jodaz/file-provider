
export const formDataHandler = (data: any) => {
    const formData = new FormData();
    const { file, ...rest } = data;

    if (file) {
        formData.append('file', file.rawFile);
    }

    for (let [key, value] of Object.entries(rest)) {
        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }
        //@ts-expect-error
        formData.append(key, value);
    };

    return formData;
}
