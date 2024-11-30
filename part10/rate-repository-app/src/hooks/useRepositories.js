import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import { ALL_REPOS } from '../graphql/queries';

const useRepositories = () => {
    const { data, loading: queryLoading } = useQuery(ALL_REPOS);
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