export const convertFilesToSrcs = (files: File[]) => {
    return files.map((e) => URL.createObjectURL(e));
}