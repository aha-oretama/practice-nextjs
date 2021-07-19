import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { TimeIcon } from '../atoms/timeIcon';
import { StatusIcon } from '../molecule/statusIcon';
import { useTests } from '../../hooks/useTest';
import { RepoResponse } from '../../pages/api/git/repositories';

interface Props {
  repositoryId: number;
  repository: RepoResponse;
}

export const Commits: React.FunctionComponent<Props> = ({
  repositoryId,
  repository,
}) => {
  const { testsData, isError, isLoading } = useTests(repositoryId);
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {testsData.map((testData) => (
          <li key={testData.id}>
            <Link href={`/gh/${repositoryId}/tests/${testData.id}`}>
              <a className="block hover:bg-blue-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex justify-start">
                      {/* FIXME: commit user should be show */}
                      <img
                        src={repository.owner.avatar_url}
                        alt="My profile icon"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="px-2 py-0.5 sm:px-6">
                        <p className="text-gray-700 truncate">
                          {testData.name}
                        </p>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm font-light text-gray-500 justify-between">
                              <time className="mr-2" dateTime="2020-01-07">
                                {moment(testData.createdAt).format()}
                              </time>
                              <div className="flex items-center">
                                <TimeIcon />
                                {testData.time}
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex items-center">
                      <span className="mr-2">
                        {`${
                          testData.tests - (testData.failures + testData.errors)
                        }/${testData.tests}`}
                      </span>
                      <StatusIcon
                        failure={testData.errors > 0 || testData.failures > 0}
                      />
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="inline-flex items-center m-4 px-4 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        View All
      </button>
    </div>
  );
};
