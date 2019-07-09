import { useEffect, useState } from "react";

interface StateProps {
  data?: any;
  loading: boolean;
  history?: any[];
}

// TODO: Debounce this function to only trigger every 350 miliseconds
export const useFetch = (url: string | null) => {
  const [state, setState] = useState<StateProps>({ data: null, loading: true, history: [] });

  useEffect(() => {
    if (url) {

      setState({ data: null, loading: true });

      fetch(url)
        .then((res: any) => {
          try {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error(res)
            }
          }
          catch (error) {
            console.log("Error: ", error)
          }
        })
        .then(data => {
          setState((prev) => ({ ...prev, data, loading: false, history: data.list }));
        })
        .catch(err => console.log("err: ", err))
    } else {
      setState({ data: '', loading: false, history: [] });
    }

  }, [url]);

  return state;
};

export default useFetch;
