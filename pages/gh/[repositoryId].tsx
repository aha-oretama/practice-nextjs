import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UserProfile } from '../../hooks/useUser';
import Layout from '../../components/layout';
import Head from 'next/head';
import { useRepository } from '../../hooks/git/useRepositories';
import { Title } from '../../components/molecule/title';
import { authServerSide } from '../../utils/auth0';
import { GetServerSideProps } from 'next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Commits } from '../../components/organism/commits';

interface Props {
  user: UserProfile;
}

const GetRepositoryId: React.FunctionComponent<Props> = ({ user }) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const { repositoryId: repositoryStringId } = router.query;
  const repositoryId = Number(repositoryStringId);

  const {
    repository,
    isError: isRepoError,
    isLoading: isRepoLoading,
  } = useRepository(user.sub, repositoryId);
  if (isRepoError) return <div>failed to load</div>;
  if (isRepoLoading) return <div>loading...</div>;

  const defaultStyle = 'py-2 px-6 rounded-t-lg';
  const selectedStyle = `${defaultStyle} bg-blue-600 text-gray-200`;
  const nonSelectedStyle = `${defaultStyle} bg-gray-100 text-gray-600`;

  return (
    <Layout user={user}>
      <Head>
        <title>{`${repository.full_name} - Testerve`}</title>
      </Head>
      <Title title={repository.full_name} />
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        className="border-bottom: 2px solid #eaeaea"
      >
        <TabList className="flex cursor-pointer">
          <Tab className={tabIndex === 0 ? selectedStyle : nonSelectedStyle}>
            Dashboard
          </Tab>
          <Tab className={tabIndex === 1 ? selectedStyle : nonSelectedStyle}>
            Commits
          </Tab>
        </TabList>
        <TabPanel>
          <h2>dashboard will be shown</h2>
        </TabPanel>
        <TabPanel>
          <Commits repositoryId={repositoryId} repository={repository!} />
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await authServerSide(context);
};

export default GetRepositoryId;
