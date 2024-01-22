import { scheduler, secureDatabase, secureDistributedLock, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/client';
import { GameState } from 'shared-types';

export class SquidnamesService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  @secureDistributedLock()
  allowAllAccessToAcquiringLock(): boolean {
    return true;
  }

  @scheduler('gameCleanup', CronExpression.EVERY_HOUR)
  async gameCleanup(): Promise<void> {
    const maxAge = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const games = await this.squid
      .collection<GameState>('games')
      .query()
      .where('lastAccess', '<', new Date().getTime() - maxAge)
      .snapshot();
    games.forEach((gameRef) => {
      const id = gameRef.data.id;
      gameRef
        .delete()
        .then(() => {
          console.log(`Cleaned up old game ID: ${id}`);
        })
        .catch((error) => {
          console.error(`Failed to delete game ID: ${id}`, error);
        });
    });
  }
}
