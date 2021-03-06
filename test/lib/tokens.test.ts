import {
  findByRepositoryId,
  findByRepositoryIds,
  findByToken,
  storeToken,
} from '../../lib/tokens';
import db from '../../models';
import crypto from 'crypto';

const mockToken =
  '1234567890abcdefghij1234567890abcdefghij1234567890abcdefghij1234';
crypto.randomBytes = jest.fn().mockReturnValue(mockToken);

describe('tokens', () => {
  it('can be stored and search it by token', async () => {
    await storeToken(123);

    const { repository_id } = await findByToken(mockToken);
    expect(repository_id).toBe(123);
  });

  it('can be stored and search it by repositoryId', async () => {
    await storeToken(124);

    const { token } = await findByRepositoryId(124);
    expect(token).toBe(mockToken);
  });

  it('can be stored and search it by repositoryIds', async () => {
    await storeToken(125);
    await storeToken(126);

    const integrations = await findByRepositoryIds([125, 126]);
    expect(integrations).toHaveLength(2);
  });
});

afterAll(async () => {
  await db.integration.destroy({
    truncate: true,
    cascade: true,
  });
  db.sequelize.close();
});
