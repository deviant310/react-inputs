import { useCallback, useState } from 'react';
import { FormData, FormDataAggregator } from '../types/form';

function useForm<Data extends FormData> (initialData: Data) {
  const [data, setData] = useState(initialData);

  const setProperty = useCallback<FormDataAggregator<Data>>(
    (key, value) => {
      if(data[key] !== value)
        setData({ ...data, [key]: value });
    },
    [data]
  );

  return { data, setProperty };
}

export default useForm;
