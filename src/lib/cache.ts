import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;

export const cache = <T extends Callback>(
  cb: T,
  keyParts: Array<string>,
  options: { revalidate?: number | false; tags?: Array<string> } = {}
) => {
  return nextCache(reactCache(cb), keyParts, options);
};
