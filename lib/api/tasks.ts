import clientPromise from '../mongodb';

export async function getTasks(): Promise<any | null> {
  const client = await clientPromise;
  const collection = client.db('').collection('tasks');
  const results = await collection.find({}).toArray();
  if (results) {
    return results;
  } else {
    return null;
  }
}
