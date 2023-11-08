import { SquidService, executable } from '@squidcloud/backend';

export class AddDataService extends SquidService {
  @executable()
  async addMockData(): Promise<void> {
    const votes = ['cat', 'dog', 'bird', 'fish', 'reptile'];
    // add 30 random documents to the animals collection
    await this.squid.runInTransaction(async (transactionId: string) => {
      for (let i = 0; i < 30; i++) {
        const favPet = votes[Math.floor(Math.random() * votes.length)];
        const currPetVotes = [...votes, favPet, favPet, favPet, favPet];
        const currPet = currPetVotes[Math.floor(Math.random() * currPetVotes.length)];
        this.squid.collection('animals').doc().update({ favorite_pet: favPet, current_pet: currPet }, transactionId);
        console.log(`Added document ${i + 1} of 30, favorite_pet: ${favPet}, current_pet: ${currPet}`);
      }
    });
  }
}
