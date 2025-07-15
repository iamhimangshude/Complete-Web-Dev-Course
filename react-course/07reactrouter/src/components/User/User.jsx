import React from "react";

import { useParams } from "react-router";

export default function User() {
  const { userid } = useParams();
  return (
    <div className="bg-orange-500 text-black text-3xl text-center py-5">
      User {userid}
    </div>
  );
}
