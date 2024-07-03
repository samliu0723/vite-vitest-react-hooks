import { useState } from "react";
import axios from "axios";

function getData() {
  return axios.get("http://my-backend/fake-date");
}

export default function FetchButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState([]);

  return (
    <div>
      <button
        onClick={() => {
          setIsLoading(true);
          getData()
            .then((response) => {
              setDate(response.data);
            })
            .catch((error) => {
              setError(error.response.data);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      >
        PUSH
      </button>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ul>
          {date.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}
