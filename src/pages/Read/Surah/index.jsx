import React from "react";
import { useParams } from "react-router-dom";

const Index = () => {
  const { id } = useParams();
  return (
    <div style={{ height: "500vh" }}>
      <h1>Surah - {id}</h1>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
        facere sed voluptatibus eveniet dolorem aspernatur saepe non fuga odit,
        ad facilis odio in pariatur doloremque esse culpa nisi ab?
      </h1>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
        facere sed voluptatibus eveniet dolorem aspernatur saepe non fuga odit,
        ad facilis odio in pariatur doloremque esse culpa nisi ab?
      </h1>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
        facere sed voluptatibus eveniet dolorem aspernatur saepe non fuga odit,
        ad facilis odio in pariatur doloremque esse culpa nisi ab?
      </h1>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
        facere sed voluptatibus eveniet dolorem aspernatur saepe non fuga odit,
        ad facilis odio in pariatur doloremque esse culpa nisi ab?
      </h1>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
        facere sed voluptatibus eveniet dolorem aspernatur saepe non fuga odit,
        ad facilis odio in pariatur doloremque esse culpa nisi ab?
      </h1>
    </div>
  );
};

export default Index;
