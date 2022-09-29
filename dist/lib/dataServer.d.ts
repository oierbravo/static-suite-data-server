import { LogLevel, LogFile } from '@lib/utils/logger/logger.types';
import { Store } from '@lib/store/store.types';
import { TaskRunner } from '@lib/task/task.types';
import { QueryRunner, QuerySuccessfulResponse, QueryErrorResponse, QueryArgs, QueryModule, CacheStatus } from '@lib/query/query.types';
import { RunMode, DataServerReturn, DataServerInitOptions } from './dataServer.types';
/**
 * The Data Server instance.
 *
 * @public
 */
declare const dataServer: {
    /**
     * Initializes the Data Server.
     *
     * @param options - Configuration options
     *
     * @returns An object with the data store and the queryRunner service.
     */
    init: (options: DataServerInitOptions) => DataServerReturn;
};
export { dataServer, DataServerInitOptions, DataServerReturn, RunMode, LogLevel, LogFile, Store, QueryRunner, QuerySuccessfulResponse, QueryErrorResponse, QueryArgs, QueryModule, TaskRunner, CacheStatus, };
//# sourceMappingURL=dataServer.d.ts.map