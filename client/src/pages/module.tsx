import React from 'react';
import { Layout, QueryResult, ModuleDetail } from '../components';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

export const GET_MODULE_AND_TRACK = gql(`
query getModuleAndTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      videoUrl
      content
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`);

const Module = () => {
  const { trackId = '', moduleId = '' } = useParams();
  const { loading, error, data } = useQuery(GET_MODULE_AND_TRACK, {
    variables: {
      trackId,
      moduleId,
    },
  });
  return (
    <Layout fullWidth>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail module={data?.module} track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
