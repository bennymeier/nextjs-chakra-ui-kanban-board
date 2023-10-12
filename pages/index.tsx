import { GetStaticProps } from 'next';
import { getTasks } from '../lib/api/tasks';
import clientPromise from '../lib/mongodb';

export default function Index({ tasks }: any) {
  return (
    <div>
      <pre>{tasks}</pre>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // You should remove this try-catch block once your MongoDB Cluster is fully provisioned
  try {
    await clientPromise;
  } catch (e: any) {
    if (e.code === 'ENOTFOUND') {
      // cluster is still provisioning
      return {
        props: {
          clusterStillProvisioning: true,
        },
      };
    } else {
      throw new Error(`Connection limit reached. Please try again later.`);
    }
  }

  const tasks = await getTasks();
  console.log(tasks);

  return {
    props: {
      tasks,
    },
    revalidate: 10,
  };
};
