"use client";
import { useEffect } from "react";
import { useCheck } from "./_api/mutation";

export default function Page() {
  const { mutate, data, error, isPending } = useCheck();
  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <>
      <button onClick={() => mutate()} disabled={isPending}>
        {isPending ? "Loading..." : "Test API"}
      </button>

      {error && <p>Error</p>}

      {data && <pre>{JSON.stringify(data.data, null, 2)}</pre>}

      <p>Hello</p>
    </>
  );
}
