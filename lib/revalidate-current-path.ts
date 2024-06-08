import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export const revalidateCurrentPath = (): void => {
    try {
        const headerList = headers();
        const pathname = headerList.get('x-pathname');
        console.log(headers());
        if (!pathname) return;
        revalidatePath(pathname);
    } catch (err: any) {
        console.log(`Failed to revalidate current path. Error: ${JSON.stringify(err.message, null, 1)}`)
        return;
    }
}