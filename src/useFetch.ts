import { useEffect, useState } from "react";

interface StateProps {
  data?: any;
  loading: boolean;
}

// TODO: Debounce this function to only trigger every 350 miliseconds
export const useFetch = (url: string | null) => {
  const [results, setResults] = useState<StateProps>({
    data: null,
    loading: true
  });

  useEffect(() => {
    if (url) {
      setResults({ data: null, loading: true });

      fetch(url)
        .then((res: any) => {
          try {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error(res);
            }
          } catch (error) {
            console.log("Error: ", error);
          }
        })
        .then(data => {
          // console.log("data: ", data)
          setResults(prev => ({ ...prev, data, loading: false }));
        })
        .catch(err => console.log("err: ", err));
    } else {
      setResults({ data: "", loading: false });
    }
  }, [url]);

  return results;
};

export default useFetch;
