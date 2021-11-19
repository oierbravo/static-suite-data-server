import { IncludeParserOptions } from '../includeParser.types';

export const entityIncludeParser = ({
  fileContent,
  includeData,
  mountPointPath,
}: IncludeParserOptions): void => {
  const includeKey = mountPointPath.pop();
  if (includeKey) {
    const mountPoint = mountPointPath.reduce(
      (previous: any, current: any) => previous?.[current],
      fileContent,
    );
    mountPoint[includeKey] = includeData.data?.content;
  }
};
