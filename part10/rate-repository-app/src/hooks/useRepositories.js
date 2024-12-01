import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import { ALL_REPOS } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading: queryLoading } = useQuery(ALL_REPOS, { variables:  variables, fetchPolicy: 'cache-and-network' });
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryLoading) {
      setLoading(true);
    } else {
      setLoading(false);
      if (data && data.repositories) {
        const nodes = data.repositories.edges.map(edge => edge.node);
        setRepositories(nodes);
      }
    }
  }, [data, queryLoading]);

  return { repositories, loading };
};

export default useRepositories;